// Imports
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const userController = {
  getUser: (req, res) => {
    return userModel.getUser(req.query).then((result) => {
      return res.send({
        Message: "Success request to server!",
        Data: result,
      });
    });
  },
  getUserById: (req, res) => {
    return userModel
      .getUserById(req.params.id)
      .then((result) => {
        res.send({
          Message: "Success request to server!",
          Data: result,
        });
      })
      .catch((error) => {
        res.status(400).send({
          Error: error,
        });
      });
  },
  edit: (req, res) => {
    if (req.body.pin_number) {
      bcrypt.hash(req.body.pin_number.toString(), 10, function (err, hash) {
        if (err)
          return res.status(500).send({
            Message: "Success request to server!",
            Error: err,
          });
        const request = {
          ...req.body,
          pin_number: hash,
          id: req.params.id,
        };
        return userModel
          .edit(request)
          .then((result) => {
            res.send({
              Message: "Success request to server!",
              Data: result,
            });
          })
          .catch((error) => {
            res.status(400).send({
              Error: error,
            });
          });
      });
    } else {
      const request = {
        ...req.body,
        image: req.file,
        id: req.params.id,
      };
      return userModel
        .edit(request)
        .then((result) => {
          res.send({
            Message: "Success request to server!",
            Data: result,
          });
        })
        .catch((error) => {
          res.status(400).send({
            Error: error,
          });
        });
    }
  },
  confirmPin: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return userModel
      .confirmPin(request)
      .then((result) => {
        return res.send({
          Message: "Success request to server!",
          Data: result,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          Error: error,
        });
      });
  },
};

// Exports
module.exports = userController;
