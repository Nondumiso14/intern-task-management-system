const express = require("express");
const router = express.Router();

const { createTask, getTasks } = require("../controllers/taskController");
const { verifyToken, isAdmin, isIntern } = require("../middleware/authMiddleware");

router.post("/tasks", verifyToken, isAdmin, createTask);

// Intern can view tasks
router.get("/tasks", verifyToken, isIntern, getTasks);

module.exports = router;