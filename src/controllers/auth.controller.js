const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
// eslint-disable-next-line no-undef
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const passwordValidator = require("../helpers/passwordValidator");
const sendOTP = require("../helpers/sendOTP");

const authController = {
  register: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        Error: errors.errors[0].msg,
      });
    }
    if (passwordValidator(req.body.password)) {
      return res.status(400).send({
        Error: passwordValidator(req.body.password),
      });
    }
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err)
        return res.status(500).send({
          Message: "Success request to server!",
          Error: err,
        });
      // Store hash in your password DB.
      const request = {
        ...req.body,
        password: hash,
      };
      return authModel
        .register(request)
        .then((result) => {
          res.status(201).send({
            Message: "Success request to server!",
            Data: `Success Register!`,
            Otp: result,
          });
        })
        .catch((error) => {
          res.status(401).send({
            Message: "Success request to server!",
            Error: error,
          });
        });
    });
  },
  login: (req, res) => {
    return authModel
      .login(req.body)
      .then((result) => {
        jwt.sign(
          { id: result.id },
          SECRET_KEY,
          { expiresIn: "1d" },
          (error, token) => {
            if (error)
              res.status(500).send({
                Message: "Server error!",
              });
            return res.send({
              Message: "Success request to server",
              Data: {
                token,
                id: result.id,
                username: result.username,
                profile_image: result.image,
                email: result.email,
                active: result.active,
                phone_number: result.phone_number,
              },
            });
          }
        );
      })
      .catch((error) => {
        res.status(400).send({
          Error: error,
        });
      });
  },
  sendOTP: (req, res) => {
    console.log(req.body.phone_number);
    let newPhone = "";
    if (req.body.phone_number[0] == 0) {
      for (let i = 0; i < req.body.phone_number.length; i++) {
        if (i == 0) {
          newPhone += "+62";
        } else {
          newPhone += req.body.phone_number[i];
        }
      }
    } else {
      newPhone += req.body.phone_number;
    }
    return sendOTP(newPhone)
      .then((result) => res.send({ otp: result }))
      .catch((err) => res.status(500).send({ Error: err }));
  },
  activated: (req, res) => {
    return authModel
      .activated(req.body.email)
      .then((result) =>
        res.send({
          Message: "Success request to server!",
          Data: result,
        })
      )
      .catch((err) =>
        res.status(500).send({
          Error: err,
        })
      );
  },
};

module.exports = authController;
