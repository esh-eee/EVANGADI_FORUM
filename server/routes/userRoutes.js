const express =require("express")
const router =express.Router()
const authMiddlware = require("../middleware/authMiddlware")

// importing user controller functions
const {register,login,checkUser} = require("../controller/userController")



//register route
router.post("/register",register)
//login route
router.post("/login",login)
// check route
router.get("/check",authMiddlware,checkUser)

module.exports= router


