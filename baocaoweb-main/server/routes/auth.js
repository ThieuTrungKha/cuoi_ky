const addField = require("../controllers/FieldController");
const adminLogin = require("../controllers/adminLogin");
const authController = require("../controllers/authController");
const router = require("express").Router();
const framework_controller = require("../controllers/frameworkCotroller");
const language_controller = require("../controllers/LanguageController");
const getUser = require("../controllers/getUser");
const commentController = require("../controllers/commentController");
const questionController = require("../controllers/questionController");
const answerController = require("../controllers/answerController");


router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

router.post("/adminlogin", adminLogin.loginAdmin);


router.post("/fieldAdmin", addField.add_field);
router.get("/viewAddField", addField.view_add_field)
router.get("/edit/:id", addField.delete_field)
router.get("/update_view/:id", addField.find_field)
router.post("/update/:id", addField.update_field)

router.get("/getLanguage", language_controller.get_field_view_language)
router.post("/addLanguage", language_controller.add_language)
router.get("/deleteLanguage/:id", language_controller.delete_language)
router.get("/updateLanguage/:id", language_controller.find_language)
router.post("/update_language/:id", language_controller.update_language)

router.get("/getFramework", framework_controller.get_field_view_framework)
router.post("/addFramework", framework_controller.add_framework)
router.get("/deleteFramework/:id", framework_controller.delete_framework)
router.get("/updateFramework/:id", framework_controller.find_framework)
router.post("/update_framework/:id", framework_controller.update_framework)




router.get("/getUser", getUser.find_user)

router.post("/addComment", commentController.add_comment)
router.get("/viewComment", commentController.view_comment)


router.post("/addQuestion", questionController.add_question);
router.get("/viewQuestion", questionController.view_question);

router.post("/addAnswer", answerController.add_answer);
router.get("/viewAnswer", answerController.view_answer);
module.exports = router;