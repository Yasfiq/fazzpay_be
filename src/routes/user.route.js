// Imports
const express = require("express");
const router = express();
const userController = require("../controllers/user.controller");
const uploads = require("../Middleware/uploads");

// endpoint
router.get("/", userController.getUser);
router.get("/:id", userController.getUserById);
router.patch("/:id", uploads.single("image"), userController.edit);
router.post("/confirm-pin/:id", userController.confirmPin);

// Exports
module.exports = router;
