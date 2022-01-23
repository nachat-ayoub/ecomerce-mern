const { Router } = require("express");
const router = Router();

// Controllers
const authController = require("../controllers/authController");
const { requireAuth } = require("../middlewares/userAuth");

// POST ROUTES
router.get("/api", requireAuth, authController.api);
router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);

// Exporting the route so we can use it in server.js.
module.exports = router;
