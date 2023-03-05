// Imports
const db = require("../helpers/dbConnect");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const sendOTP = require("../helpers/sendOTP");

const auhtModel = {
  register: ({ username, email, password, phone_number }) => {
    let newPhone = "";
    if (phone_number[0] == 0) {
      for (let i = 0; i < phone_number.length; i++) {
        if (i == 0) {
          newPhone += "+62";
        } else {
          newPhone += phone_number[i];
        }
      }
    } else {
      newPhone += phone_number;
    }
    return new Promise((success, failed) => {
      db.query(
        `INSERT INTO users (id, username, email, password, phone_number) VALUES ($1,$2,$3,$4,$5) RETURNING id`,
        [uuidv4(), username, email, password, newPhone],
        (error, result) => {
          if (error) return failed(error.message);
          db.query(
            `INSERT INTO wallets VALUES ($1,$2,$3,$4)`,
            [uuidv4(), result.rows[0].id, 0, 0],
            (err) => {
              if (err) return failed(err.message);
              sendOTP(newPhone).then((result) => success(result));
            }
          );
        }
      );
    });
  },
  login: ({ email, password }) => {
    return new Promise((success, failed) => {
      db.query(`SELECT * FROM users WHERE email=$1`, [email], (err, res) => {
        if (err) return failed(err.message);
        if (res.rows[0] === undefined)
          return failed("Email or Password is wrong!");
        bcrypt.compare(
          password,
          res.rows[0].password,
          function (error, result) {
            if (error) return failed("Server error!");
            if (!result) return failed("Email or Password is wrong!");
            return success(res.rows[0]);
          }
        );
      });
    });
  },
  activated: (email) => {
    return new Promise((success, failed) => {
      db.query(`SELECT * FROM users WHERE email=$1`, [email], (err, res) => {
        if (err) return failed(err.message);
        if (res.rows.length == 0) return failed("User not found!");
        db.query(`UPDATE users SET active='yes'`, (error) => {
          if (error) return failed(error.message);
          return success("Success activated account");
        });
      });
    });
  },
};

module.exports = auhtModel;
