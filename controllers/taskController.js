const db = require("../config/db");

exports.createTask = (req, res) => {
  const { title, description, deadline } = req.body;

  if (!title || !deadline) {
    return res.status(400).json({ message: "Title and deadline are required" });
  }

  const created_by = req.user.id;

  db.query(
    "INSERT INTO tasks (title, description, deadline, created_by) VALUES (?, ?, ?, ?)",
    [title, description, deadline, created_by],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.status(201).json({ message: "Task created successfully" });
    }
  );
};

exports.getTasks = (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json(results);
  });
};