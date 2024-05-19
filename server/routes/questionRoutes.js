
const express = require("express");
// question contrrolers
const {
	singleQuestion,
	allQuestions,
	question,
} = require("../controller/questionsController");
// const postAnswer = require("../controller/answerController");



const router = express.Router();

// question routes
router.post("/ask", question);

//
router.get("/get-all", allQuestions);

router.get("/question/:questionid", singleQuestion);

module.exports = router;