// Imports
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const userController = {
  getUserWallet: (req, res) => {
    return userModel.getUser(req.params.id).then((result) => {
      res.send({
        Message: "Success request to server!",
        Data: result,
      });
    });
  },
  edit: (req, res) => {
    bcrypt.hash(req.body.pin_number, 10, function (err, hash) {
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
