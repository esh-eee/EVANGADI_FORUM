// db connection
const dbconnection = require("../db/dbconfig");
// importing module that helps to encrypt password
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken")
async function register(req, res) {
  const { firstname, lastname, password, email, username } = req.body;
  if (!firstname || !lastname || !password || !email || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required informations " });
  }
  try {
    const [user] = await dbconnection.query(
      "SELECT username, userid FROM users WHERE username=? OR email= ?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "This user is already registered" });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must contain at least 8 characters" });
    }
    // Encrypting the password
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into the database
    await dbconnection.query(
      "INSERT INTO users(firstname, lastname, password, email, username) values (?, ?, ?, ?, ?)",
      [firstname, lastname, hashedPassword, email, username]
    );

    // Retrieve the userid of the inserted user
    const [[{ userid }]] = await dbconnection.query("SELECT userid FROM users WHERE username=?", [username]);

    // Generating token
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(StatusCodes.CREATED).json({ msg: "User created!", token });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required informations" });
  }
try {
const [user]= await dbconnection.query("SELECT userid, username, password FROM users WHERE email=?",[email])
if (user.length==0) {
  return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential, user doesn't exist in this eamil"})
}

// compare hashed and default password
const isMatch = await bcrypt.compare(password, user[0].password)
if (!isMatch) {
  return res.status(StatusCodes.BAD_REQUEST).json({msg:"invalid credential, the password is wrong!"})
  
}
const username= user[0].username
const userid = user[0].userid


const token = jwt.sign({username,userid},process.env.JWT_SECRET, {expiresIn:"1d"})

return res.status(StatusCodes.OK).json({msg:"user login successfully",token, username})



} catch (error) {console.log(error.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong, please try again!" });
}



}

async function checkUser(req, res) {
  const username= req.user.username
  const userid= req.user.userid
  res.status(StatusCodes.OK).json({msg: "valid user", username,userid})
}
module.exports = { register, login, checkUser };
