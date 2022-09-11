const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/*Xu ly CORS*/
const cors = require("cors");
router.use(cors());

router.get("/", function (req, res, next) {
  res.send("Alo");
  console.log("hello");
});
router.get("/test", function (req, res, next) {
  res.send("Alo123");
  console.log("hello");
});
// router.get('/', (req, res) => res.send('USER ROUTE'))

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });
  }
  try {
    const user = await User.findOne({ username });
    console.log("info: ", user, username)
    if (user) {
      return res
        .status(400)
        .json({ sucess: false, message: "Useranem already taken" });
    }
    const newUser = new User({ username, password });
    await newUser.save();

    const accessToken = jwt.sign(
      { userID: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log("Đã có lỗi gì đó: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const username_db = await User.findOne({ username });
    const password_db = await User.findOne({ password });
    console.log("username_db: ", username_db)
    console.log("password_db: ", password_db)
    if(!username_db || !password_db) {
      return res.send("false");
    } else {
      return res.send(username_db);
    }
    // console.log("info: ", user)
    // res.send(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }

});





module.exports = router;
