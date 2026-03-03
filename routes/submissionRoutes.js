const express = require("express");
const router = express.Router();

const { createSubmission } = require("../controllers/submissionController");
const { verifyToken, isIntern } = require("../middleware/authMiddleware");

router.post("/submissions", verifyToken, isIntern, createSubmission);

module.exports = router;