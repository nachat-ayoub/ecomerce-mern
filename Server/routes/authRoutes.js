const { Router } = require("express");
const router = Router();

// Controllers
const authController = require("../controllers/authController");

// GET ROUTES
router.get("/signup", authController.signup_get);
router.get("/login", authController.login_get);
// POST ROUTES
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);

// Exporting the route so we can use it in server.js.
module.exports = router;
