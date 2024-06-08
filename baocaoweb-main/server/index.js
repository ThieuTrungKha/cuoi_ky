//index.js
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(cookieParser())
app.use(express.json())





app.get('/admin', (req, res) => {
  res.redirect('/admin');
});


// app.get('/Framework', async (req, res) => {
//   res.render('./partials/adminFramework')
// });

const frameworksModel = require('./models/Framework');
const languageModel = require('./models/Language');
//user
app.get('/signup', (req, res) => {
  Promise.all([
    languageModel.find(),
    frameworksModel.find(),
  ])
    .then(([ languages, frameworks]) => {
      res.json({  languages, frameworks });

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

