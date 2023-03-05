//import eksternal
const express = require("express");
const router = express();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const transactionRoute = require("./transaction.route");

// Auth Route
router.use("/auth", authRoute);

// User Route
router.use("/user", userRoute);

// Transaction Route
router.use("/transaction", transactionRoute);

// routing landing page
router.get("/", (req, res) => {
  return res.send("This is homepage");
});

// exports
module.exports = router;
