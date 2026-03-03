const express = require("express");
const router = express.Router();

const { createSubmission, updateSubmissionStatus } = require("../controllers/submissionController");
const { verifyToken, isIntern, isAdmin } = require("../middleware/authMiddleware");

router.post("/submissions", verifyToken, isIntern, createSubmission);
// Admin updates submission status
router.put("/submissions/:id", verifyToken, isAdmin, updateSubmissionStatus);

module.exports = router;