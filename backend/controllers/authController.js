// User Model:
const User = require("../models/User");
// const auth = require("../firebaseConfig");
const { createUserWithEmailAndPassword } = require("firebase/auth");

module.exports.api = async (req, res) => {
  try {
    res.status(200).json({
      message: "success",
      data: "user found in!",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.signup_post = async (req, res) => {
  try {
    const { username, email, uid } = req.body;
    if (username && email && uid) {
      const user = await User.create({ username, email, uid });
      res.status(200).json({ message: "user saved successefully" });
    }
  } catch (err) {
    res.json({ message: "failed to save the user" });
    console.log(err);
  }
};

module.exports.login_post = (req, res) => {
  res.json("login");
};
