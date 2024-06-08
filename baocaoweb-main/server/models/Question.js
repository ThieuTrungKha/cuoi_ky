const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
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
        // answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'answers' }]
    },
    { timestamps: true }
);



module.exports = mongoose.model("question", questionSchema);

