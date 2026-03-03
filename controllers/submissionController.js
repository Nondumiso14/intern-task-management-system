const db = require("../config/db");

exports.createSubmission = (req, res) => {
  const { task_id, github_link, description } = req.body;

  if (!task_id || !github_link) {
    return res.status(400).json({ message: "Task ID and GitHub link are required" });
  }

  const intern_id = req.user.id;

  db.query("SELECT * FROM tasks WHERE id = ?", [task_id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = results[0];

    const now = new Date();
    const deadline = new Date(task.deadline);

    if (now > deadline) {
      return res.status(400).json({ message: "Deadline has passed. Cannot submit." });
    }

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

// 🔥 NOTICE THIS IS OUTSIDE createSubmission
exports.updateSubmissionStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Status must be Approved or Rejected" });
  }

  db.query("SELECT * FROM submissions WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Submission not found" });
    }

    db.query(
      "UPDATE submissions SET status = ? WHERE id = ?",
      [status, id],
      (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        res.json({ message: `Submission ${status} successfully` });
      }
    );
  });
};