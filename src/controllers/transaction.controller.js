const transactionModel = require("../models/transaction.model");
const userModel = require("../models/user.model");
// const core = require("../helpers/midtrans");

const transactionController = {
  transfer: (req, res) => {
    return userModel
      .getUserById(req.body.user_id)
      .then((userRes) => {
        const newBalance = userRes.balance - req.body.nominal;
        if (newBalance < 0) {
          return res.status(400).send({
            Error: "Saldo tidak cukup!",
          });
        } else {
          userModel
            .getUserById(req.params.id)
            .then((recRes) => {
              console.log(recRes);
              const request = {
                ...req.body,
                username: userRes.username,
                user_image: userRes.image,
                user_phone: userRes.phone_number,
                receiver_id: req.params.id,
                phone_number: recRes.phone_number,
                subject_name: recRes.username,
                subject_image: recRes.image,
              };
              return transactionModel
                .transfer(request)
                .then((result) => {
                  return res.send({
                    Message: "Success request to server!",
                    Data: result,
                  });
                })
                .catch((error) => {
                  res.status(400).send({
                    Error: error,
                  });
                });
            })
            .catch((recErr) => {
              return res.status(400).send({
                Error: recErr,
              });
            });
        }
      })
      .catch((userErr) => {
        return res.status(400).send({
          Error: userErr,
        });
      });
  },
  history: (req, res) => {
    return transactionModel
      .history(req.params.id)
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
  topup: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
      // user_id: req.params.id,
    };
    // core.charge(request).then((chargeResponse) => {
    //   console.log("chargeResponse:");
    //   console.log(chargeResponse);
    //   return res.send(chargeResponse);
    // });
    return transactionModel
      .topup(request)
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
module.exports = transactionController;
