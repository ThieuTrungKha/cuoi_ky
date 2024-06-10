const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Language = require("../models/Language");


const authController = {
  // REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // Create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      // Save user to DB
      await newUser.save();
      let idField = req.body.selectedFieldId;
      let idLanguage = req.body.selectedLanguages;
      let idFramework = req.body.selectedFrameworks;
      console.log(idLanguage);
      const updateData = {
        $inc: { count: 1 }
      };
      const Field = require('../models/Field');
      const framework = require('../models/Framework');

      const updatedField = await Field.findByIdAndUpdate(idField, updateData, { new: true });
      if (!updatedField) {
        return res.status(404).send('Field not found');
      }
      const updatedLanguage = await Language.findByIdAndUpdate(idLanguage, updateData, { new: true });
      if (!updatedLanguage) {
        return res.status(404).send('Language not found');
      }

      const updatedframework = await framework.findByIdAndUpdate(idFramework, updateData, { new: true });
      if (!updatedframework) {
        return res.status(404).send('framework not found');
      }
      res.status(200).json({ redirect: '/login' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
      
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30d" }
    );
  },

  // LOGIN
  loginUser: async (req, res) => {

    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Incorrect username");
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(404).json("Incorrect password");
      }
      const accessToken = authController.generateAccessToken(user);

      res.cookie('accessToken', accessToken, { httpOnly: false, secure: false });
      res.redirect('/home_server');
      // res.render('./partials/home', { user, accessToken });
      // res.status(200).json({ redirect: '/home', user, accessToken });


    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = authController;
