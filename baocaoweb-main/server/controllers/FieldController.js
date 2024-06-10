const Field = require('../models/Field');


const addField = {
    view_add_field: async (req, res) => {
        try {
            const dataField = await Field.find();
            res.status(200).json({ redirect: '/viewAddField', dataField }); 
        } catch (err) {
            res.status(500).send(err);
        }
    },
    add_field: async (req, res) => { 
        try {
            const newField = new Field({
                nameField: req.body.nameField,
                count: req.body.count,
                describe: req.body.describe,
                docField: req.body.docField
            });

            await newField.save();

            // res.redirect('/viewAddField');
            res.status(200).json({ redirect: '/viewAddField' });
        } catch (err) {
            res.status(500).send(err);

        }

    },

    delete_field: async (req, res) => {
        let id = req.params.id;
        await Field.deleteOne({ _id: id })
        // res.redirect('/viewAddField');
        res.status(200).json({ redirect: '/viewAddField' });

    },

    find_field: async (req, res) => {
        let id = req.params.id;
        try {
            let field = await Field.findById(id).exec();
            if (!field) {
                res.status(200).json({ redirect: '/not field' });
            }
            res.status(200).json({ redirect: '/update', field });
        } catch (error) {
            console.error(error);
            res.status(200).json({ redirect: '/home_admin' });
        }
    },
    update_field: async (req, res) => {
        try {

            let id = req.params.id;
            const updateData = {
                nameField: req.body.nameField,
                describe: req.body.describe
            };

            const updatedField = await Field.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedField) {
                return res.status(404).send('Field not found');
            }

            // res.redirect('/viewAddField');
            res.status(200).json({ redirect: '/viewAddField' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }


}


module.exports = addField;