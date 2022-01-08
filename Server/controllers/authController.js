// User Model:
const User = require("../models/User");

// Signup Controllers
module.exports.signup_get = (req, res) => {
  res.json("signup");
};
module.exports.signup_post = (req, res) => {
  res.json("signup");
};

// Login Controllers
module.exports.login_get = (req, res) => {
  res.json("login");
};
module.exports.login_post = (req, res) => {
  res.json("login");
};
