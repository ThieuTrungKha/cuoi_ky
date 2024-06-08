const Answer = require('../models/answer');

const answerController = {
    view_answer: async (req, res) => {
        try {
            const dataAnswer = await Answer.find();
            res.status(200).json({ dataAnswer });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    add_answer: async (req, res) => {
        try {
            // Lấy dữ liệu từ yêu cầu người dùng
            const { content, userID, userName, questionID } = req.body;
            // Tạo một câu trả lời mới
            const newAnswer = new Answer({
                content,
                userID,
                userName,
                questionID,
            });
            await newAnswer.save();

            res.status(200).json({ message: 'Answer added successfully', answer: newAnswer });
        } catch (err) {
            // Xử lý lỗi nếu có
            console.error('Error adding answer:', err);
            res.status(500).json({ error: 'An error occurred while adding the answer' });
        }
    },
};

module.exports = answerController;
