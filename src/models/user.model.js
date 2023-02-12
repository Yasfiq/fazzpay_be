// Imports
const db = require("../../helpers/dbConnect");
const bcrypt = require("bcrypt");

const userModel = {
  getUser: (id) => {
    return new Promise((success, failed) => {
      db.query(
        `SELECT username,email,phone_number,pin_number FROM users WHERE id=$1`,
        [id],
        (error, result) => {
          if (error) return failed(error.message);
          if (result.rows.length === 0) return failed("Id not found!");
          return success(result.rows[0]);
        }
      );
    });
  },
  edit: ({ id, pin_number, phone_number }) => {
    return new Promise((success, failed) => {
      db.query(`SELECT * FROM users WHERE id=$1`, [id], (error, result) => {
        if (error) return failed(error.message);
        if (result.rows.length === 0) return failed("Id not found!");
        db.query(
          `UPDATE users SET pin_number=$1,phone_number=$2`,
          [
            pin_number || result.rows[0].pin_number,
            phone_number || result.rows[0].phone_number,
          ],
          (err) => {
            if (err) return failed(err.message);
            return success("Success update!");
          }
        );
      });
    });
  },
  confirmPin: ({ id, pin }) => {
    return new Promise((success, failed) => {
      db.query(`SELECT * FROM users WHERE id=$1`, [id], (error, result) => {
        if (error) return failed(error.message);
        if (result.rows.length === 0) return failed("Id not found!");
        bcrypt.compare(pin, result.rows[0].pin_number, (err, res) => {
          if (err) return failed(err.message);
          if (!res) return failed("The PIN number you entered is incorrect");
          return success("Pin is correct");
        });
      });
    });
  },
};

// Exports
module.exports = userModel;
