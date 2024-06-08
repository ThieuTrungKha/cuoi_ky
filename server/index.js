//index.js
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const middlewareController = require("./controllers/midlewareController")

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(cookieParser())
app.use(express.json())


const user = require('./models/User');
app.get('/home_server', middlewareController.verifyToken, async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const decodedToken = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
  const userId = decodedToken.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  try {
    const user_id = await user.findById(userId).exec();
    res.status(200).json({ success: "true", data: user_id });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


const fieldsModel = require('./models/Field');
const frameworksModel = require('./models/Framework');
const languageModel = require('./models/Language');
//user
app.get('/signup', (req, res) => {
  Promise.all([
    fieldsModel.find(),
    languageModel.find(),
    frameworksModel.find(),
  ])
    .then(([fields, languages, frameworks]) => {
      res.json({ fields, languages, frameworks });

    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.get('/:', (req, res) => {
  res.send('Login');
});

app.get('/home', (req, res) => {
  Promise.all([
    fieldsModel.find(),
    frameworksModel.find(),
  ])
    .then(([fields, frameworks]) => {
      res.json({ fields, frameworks });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const port = 9000


const db = require("./config");
db.connect()



app.use("/", authRoute);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
})

