const authController = require("../controllers/authController");
const router = require("express").Router();
const questionController = require("../controllers/questionController");
const answerController = require("../controllers/answerController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);


router.post("/addQuestion", questionController.add_question);
router.get("/viewQuestion", questionController.view_question);

router.post("/addAnswer", answerController.add_answer);
router.get("/viewAnswer", answerController.view_answer);
module.exports = router;