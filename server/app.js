require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbconnection = require("./db/dbconfig"); // Adjust the path according to your folder structure

const app = express();
const port = process.env.PORT || 3306;

app.use(cors());
app.use(express.json());

// Middleware and route setup
const authMiddleware = require("./middleware/authMiddlware");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");

app.use("/api/users", userRoutes);
app.use("/api/questions", authMiddleware, questionRoutes);
app.use("/api/answers", authMiddleware, answerRoutes);
app.get("/", (req, res) => {
  res.send("Hello, Render! Your app is successfully deployed.");
});

async function start() {
  try {
    await dbconnection.execute("select 'test'");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log("Database connection established");
    });
  } catch (error) {
    console.log("Error starting server:", error.message);
  }
}

start();
