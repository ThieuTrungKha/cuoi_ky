const language = require('../models/Language');
const framework = require('../models/Framework');
const framework_controller = {
    get_field_view_framework: async (req, res) => {
        try {
            const data_language = await language.find();
            const data_framework = await framework.find();
            res.status(200).json({ redirect: '/getFramework', data_language, data_framework });
        } catch (error) {

        }
    },
    add_framework: async (req, res) => {
        try {
            const newFramework = new framework({
                id_language: req.body.id_language,
                nameFramework: req.body.nameFramework,
                describe: req.body.describe,
                docFramework: req.body.docFramework

            });


            await newFramework.save();

            res.redirect('/getFramework');
        } catch (error) {

        }
    },
    delete_framework: async (req, res) => {
        let id = req.params.id;
        await framework.deleteOne({ _id: id })
        // res.redirect('/getFramework');
        res.status(200).json({ message: 'Ngôn ngữ đã được xóa thành công' });
    },
    find_framework: async (req, res) => {
        let id = req.params.id;

        try {
            let findFramework = await framework.findById(id).exec();
            if (!findFramework) {
                return res.redirect('/home_admin');
            }
            res.status(200).json({ redirect: '/update_framework', findFramework });
        } catch (error) {
            console.error(error);
            res.redirect('/home_admin');
        }
    },
    update_framework: async (req, res) => {
        try {

            let id = req.params.id;
            const updateDataFramework = {
                nameFramework: req.body.nameFramework,
                describe: req.body.describe,
                docFramework: req.body.docFramework
            };

            const updateFramework = await framework.findByIdAndUpdate(id, updateDataFramework, { new: true });
            if (!updateFramework) {
                return res.status(404).send('Field not found');
            }

            res.redirect('/getFramework');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = framework_controller;