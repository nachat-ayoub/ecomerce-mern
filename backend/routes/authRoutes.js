const { Router } = require("express");
const router = Router();

// Controllers
const authController = require("../controllers/authController");
const { adminAuth } = require("../middlewares/requireAuth");

// POST ROUTES
router.post("/signup", authController.signup);
router.post("/verify", adminAuth, authController.verify);

// Exporting the route so we can use it in server.js.
module.exports = router;
