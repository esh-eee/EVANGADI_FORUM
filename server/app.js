require("dotenv").config()
const express = require("express")
const app = express()
const port= 5500
const cors = require("cors")
app.use(cors())
// const cors = require("cors")
// app.use(cors)
//db connection
const dbconnection=require("./db/dbconfig")
  // authentication middlewar
  const authMiddlware =require("./middleware/authMiddlware")
// user routes middleware file
const userRoutes=require("./routes/userRoutes")

// json middleware to extract json data
app.use(express.json())

// user routes middleware
app.use("/api/users", userRoutes)
// questions routes middleware
// questions middleware

const questionRoutes = require("./routes/questionRoutes");
// const authMiddlware = require("./middleware/authMiddlware")


app.use("/api/questions", authMiddlware, questionRoutes);

//answers routes middleware
const answerRoutes = require("./routes/answerRoutes");
app.use("/api/answers",authMiddlware, answerRoutes);
async function start() {
    try {
        const result = await dbconnection.execute("select 'test' ");
        await app.listen(port)
        console.log("database connection established")
        console.log(`listening to ${port}`)
    }
     catch (error) {
        console.log(error.message);
    }
    
}

start()





