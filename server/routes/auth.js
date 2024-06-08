const addField = require("../controllers/FieldController");
const adminLogin = require("../controllers/adminLogin");
const router = require("express").Router();

const getUser = require("../controllers/getUser");
const commentController = require("../controllers/commentController");





router.post("/adminlogin", adminLogin.loginAdmin);


router.post("/fieldAdmin", addField.add_field);
router.get("/viewAddField", addField.view_add_field)
router.get("/edit/:id", addField.delete_field)
router.get("/update_view/:id", addField.find_field)
router.post("/update/:id", addField.update_field)






router.get("/getUser", getUser.find_user)

router.post("/addComment", commentController.add_comment)
router.get("/viewComment", commentController.view_comment)



module.exports = router;