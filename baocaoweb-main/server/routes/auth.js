
const router = require("express").Router();
const framework_controller = require("../controllers/frameworkCotroller");
const language_controller = require("../controllers/LanguageController");




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





module.exports = router;