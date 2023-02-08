//import eskternal
const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
// const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
// import dotenv
require("dotenv").config();
// eslint-disable-next-line no-undef
const { PORT } = process.env;

//import internal
const router = require("./src/routes");

//menerima x-www.form.urlencoded
app.use(urlencoded({ extended: true }));

//static file
app.use(express.static("public"));

//menerima raw JSON
app.use(json());

//cors
// var corsOptions = {
//   origin: CORS_ACCESS,
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors());

//routes parent
app.use("/api/v1/", router);

//endpoint
//routing if can't get a routes
app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});

//listening server~
app.listen(PORT, () => {
  console.log(`Successfully running on ${PORT}`);
});
