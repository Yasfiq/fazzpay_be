// Imports
const express = require("express");
const router = express();
const authController = require("../controllers/auth.controller");
const {
  validatorRegister,
  validatorLogin,
} = require("../../helpers/validator");

router.post("/register", validatorRegister, authController.register);
router.post("/login", validatorLogin, authController.login);

// Exports
module.exports = router;
