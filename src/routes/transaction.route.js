// Imports
const express = require("express");
const router = express();
const transactionController = require("../controllers/transaction.controller");

// Endpoint
router.post("/:id", transactionController.transfer);
router.get("/:id", transactionController.history);
router.post("/topup/:id", transactionController.topup);

module.exports = router;
