const taskRoutes = require("./routes/taskRoutes");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");

dotenv.config();

const app = express();   // ✅ CREATE APP FIRST

app.use(cors());
app.use(express.json());

// ✅ THEN use routes
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Intern Task Management System API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});