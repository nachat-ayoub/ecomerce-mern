const admin = require("../config/firebaseAdminConfig");
// Models
const User = require("../models/User");

module.exports.adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorisation.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken) {
      // console.log(decodedToken);
      // const email_verified = decodedToken.email_verified;
      // const email = decodedToken.email;
      const uid = decodedToken.uid;
      const user = await User.findOne({ uid });
      if (user && user.role === "admin") {
        return next();
      }
    }
    return res.status(400).json({
      msg: "failed invalid token or you are not allowed to access this route!",
      isAdmin: false,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      msg: "failed invalid token",
      isAdmin: false,
      err: e.message,
    });
  }
};

module.exports.userAuth = async (req, res, next) => {};
