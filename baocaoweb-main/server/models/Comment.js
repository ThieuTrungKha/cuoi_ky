const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        desc: {
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
    },
    { timestamps: true }
);



module.exports = mongoose.model("commnet", commentSchema);

