// Imports
const express = require("express");
const router = express();
const userController = require("../controllers/user.controller");

// endpoint
router.get("/:id", userController.getUserWallet);
router.patch("/:id", userController.edit);
router.post("/confirm-pin/:id", userController.confirmPin);

// Exports
module.exports = router;
