const { Router } = require("express");
const router = Router();

// Controllers
const productController = require("../controllers/productController");
const { adminAuth } = require("../middlewares/requireAuth");

// POST ROUTES
router.get("/getall", productController.getall); // no auth.
router.get("/getone/:id", adminAuth, productController.getone); // require Admin auth using the adminAuth middleware.
router.post("/add/:id", adminAuth, productController.add); // require Admin auth using the adminAuth middleware.
router.delete("/delete/:id", adminAuth, productController.delete); // require Admin auth using the adminAuth middleware.
router.put("/update/:id", adminAuth, productController.update); // require Admin auth using the adminAuth middleware.

// Exporting the route so we can use it in server.js.
module.exports = router;
