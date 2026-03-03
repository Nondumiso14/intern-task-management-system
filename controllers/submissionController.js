const db = require("../config/db");

exports.createSubmission = (req, res) => {
  const { task_id, github_link, description } = req.body;

  if (!task_id || !github_link) {
    return res.status(400).json({ message: "Task ID and GitHub link are required" });
  }

  const intern_id = req.user.id;

  // 1. Check if task exists
  db.query("SELECT * FROM tasks WHERE id = ?", [task_id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = results[0];

    // 2. Deadline validation
    const now = new Date();
    const deadline = new Date(task.deadline);

    if (now > deadline) {
      return res.status(400).json({ message: "Deadline has passed. Cannot submit." });
    }

    // 3. Insert submission
    db.query(
      "INSERT INTO submissions (task_id, intern_id, github_link, description) VALUES (?, ?, ?, ?)",
      [task_id, intern_id, github_link, description],
      (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        res.status(201).json({ message: "Submission successful. Status is Pending." });
      }
    );
  });
};