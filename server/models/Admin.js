//User.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,   
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("admins", adminSchema);
