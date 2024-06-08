const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    id_field: {
      type: String,
    },
    nameLanguage: {
      type: String,
    },
    describe: {
      type: String,
   
    },
    count: {
      type: Number,
    },
    docLanguage: {
      type: String,

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("languages", languageSchema);
