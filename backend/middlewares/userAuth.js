const admin = require("../config/firebaseAdminConfig");

module.exports.requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorisation.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken) {
      console.log(decodedToken);
      const email = decodedToken.email;
      const email_verified = decodedToken.email_verified;
      const uid = decodedToken.uid;
      return next();
    }
    return res.status(200).json({
      message: "failed",
      data: "invalid token",
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      message: "failed",
      data: "invalid token",
    });
  }
};
