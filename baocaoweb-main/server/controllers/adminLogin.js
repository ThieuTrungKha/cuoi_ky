const Admin = require("../models/Admin")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Field = require("../models/Field");
const Framework = require("../models/Framework")

const adminLogin = {
  generateAccessToken: (admin) => {
    return jwt.sign(
      {
        id: admin.id,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30d" }
    );
  },
  loginAdmin: async (req, res) => {
    try {
      const admin = await Admin.findOne({ adminName: req.body.adminName });
      if (!admin) {
        return res.status(404).json("Sai tên đăng nhập");
      }

      const validPassword = await bcrypt.compare(req.body.password, admin.password);
      if (!validPassword) {
        return res.status(404).json("Incorrect password");
      }
      const accessToken = adminLogin.generateAccessToken(admin);

      const totalUser = await User.countDocuments({});
      const totalField = await Field.countDocuments({});
      const totalFramework = await Framework.countDocuments({});
      // res.status(200).json({ redirect: '/home_admin', admin, totalUser, totalField, totalFramework });
      res.status(200).json({ redirect: '/home_admin' });
    } catch (error) {
      return res.status(404).json("");
    }
  }
}
module.exports = adminLogin