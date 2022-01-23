// User Model:
const User = require("../models/User");
// const auth = require("../firebaseConfig");
const { createUserWithEmailAndPassword } = require("firebase/auth");

module.exports.signup = async (req, res) => {
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

module.exports.verify = (req, res) => {
  res.json({ msg: "you are an admin", isAdmin: true });
};
