const mongoose = require('mongoose');
const user = require('../models/User');

const getUser = {

    find_user: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            const decodedToken = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
            const userId = decodedToken.id;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error('Invalid user ID');
            }

            const user_id = await user.findById(userId).exec();
            
            res.status(200).json({username: user_id.username});
        } catch (error) {
            console.error(error);
            res.status(200).json({ redirect: '/home_admin' });
        }
    },
}

module.exports = getUser;
