const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        questionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'question',
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("answers", answerSchema);