// Imports
const db = require("../../helpers/dbConnect");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const auhtModel = {
  register: ({ username, email, password }) => {
    return new Promise((success, failed) => {
      db.query(
        `INSERT INTO users (id, username, email, password) VALUES ($1,$2,$3,$4) RETURNING id`,
        [uuidv4(), username, email, password],
        (error, result) => {
          if (error) return failed(error.message);
          db.query(
            `INSERT INTO wallets VALUES ($1,$2,$3,$4)`,
            [uuidv4(), result.rows[0].id, 0, 0],
            (err) => {
              if (err) return failed(err.message);
              return success("Success Register, Please login to your account!");
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
};

module.exports = auhtModel;
