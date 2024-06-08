const field = require('../models/Field');
const language = require('../models/Language');
const language_controller = {
    get_field_view_language: async (req, res) => {
        try {
            const data_field = await field.find();
            const data_language = await language.find();
            res.status(200).json({ redirect: '/getLanguage', data_field, data_language });
        } catch (error) {

        }
    },
    add_language: async (req, res) => {
        try {
            console.log(req.body.id_field);
            console.log(req.body.nameLanguage);
            console.log(req.body.docLanguage);
            console.log(req.body.describe);
            const newLanguage = new language({
                nameLanguage: req.body.nameLanguage,
                docLanguage: req.body.docLanguage,
                describe: req.body.describe,
                id_field: req.body.id_field,

            });
            await newLanguage.save();

            res.redirect('/getLanguage');
        } catch (error) {

        }
    },
    delete_language: async (req, res) => {
        let id = req.params.id;
        await language.deleteOne({ _id: id })
        res.status(200).json({ redirect: '/getLanguage' });

    },
    find_language: async (req, res) => {
        let id = req.params.id;

        try {
            let findLanguage = await language.findById(id).exec();
            if (!findLanguage) {
                res.status(200).json({ redirect: '/home_admin' });
            }
            res.status(200).json({ redirect: '/update_language', findLanguage });
            // res.render('partials/update_language', { findLanguage });
        } catch (error) {
            console.error(error);
            // res.redirect('/home_admin');
            res.status(200).json({ redirect: '/home_admin' });

        }
    },
    update_language: async (req, res) => {
        try {
            let id = req.params.id; 
            const updateDataLanguage = {
                nameLanguage: req.body.nameLanguage,
                docLanguage: req.body.docLanguage,
                describe: req.body.describe
            };

            const updatedLanguage = await language.findByIdAndUpdate(id, updateDataLanguage, { new: true });
            if (!updatedLanguage) {
                return res.status(404).send('Field not found');
            }
            res.status(200).json({ redirect: '/getLanguage' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = language_controller;