const Question = require('../models/Question');

const questionController = {
    view_question: async (req, res) => {
        try {
            const dataQuestion = await Question.find();
            res.status(200).json({ dataQuestion });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    add_question: async (req, res) => {
        try {
            const { title, content, userID, userName } = req.body;
            const newQuestion = new Question({
                title,
                content,
                userID,
                userName,
            });
            await newQuestion.save();

            res.status(200).json({ message: 'Question added successfully', question: newQuestion });
        } catch (err) {
            // Xử lý lỗi nếu có
            console.error('Error adding question:', err);
            res.status(500).json({ error: 'An error occurred while adding the question' });
        }
    },
};

module.exports = questionController;
