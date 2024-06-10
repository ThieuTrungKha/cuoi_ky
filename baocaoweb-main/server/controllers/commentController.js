const Comment = require('../models/Comment');

const commentController = {

    view_comment: async (req, res) => {
        try {
            const dataComment = await Comment.find();
            res.status(200).json({ dataComment });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    add_comment: async (req, res) => {
        try {
            const { desc, userID, userName } = req.body;
            const newComment = new Comment({
                desc,
                userID,
                userName,
            });
            await newComment.save();

            res.status(200).json({ comment: newComment });
        } catch (err) {
            // Xử lý lỗi nếu có
            console.error('Error adding comment:', err);
            res.status(500).json({ error: 'An error occurred while adding the comment' });
        }
    },
};

module.exports = commentController;
