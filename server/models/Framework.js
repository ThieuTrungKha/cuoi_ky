//User.js
const mongoose = require("mongoose");

const frameworkSchema = new mongoose.Schema(
  {
    id_language: {
      type: String
    },
    nameFramework: {
      type: String,
    },
    describe: {
      type: String,
    },
    count: {
      type: Number,

    },
    docFramework: {
      type: String,

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("frameworks", frameworkSchema);
