//User.js
const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema(
  {
    nameField: {
      type: String,
    },
    count: {
      type: Number,

    },
    describe: {
      type: String,
    },
    docField: {
      type: String,

    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("fields", fieldSchema);
