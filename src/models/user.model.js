// Imports
const db = require("../helpers/dbConnect");
const bcrypt = require("bcrypt");

const userModel = {
  getUser: function (queryParams) {
    return new Promise((success, failed) => {
      db.query(
        `SELECT u.id, username, phone_number, image, w.balance FROM users AS u INNER JOIN wallets AS w ON u.id=w.user_id ${this.search(
          queryParams.search
        )} ORDER BY username ASC`,
        (err, res) => {
          if (err) return failed(err.message);
          return success(res.rows);
        }
      );
    });
  },
  getUserById: (id) => {
    return new Promise((success, failed) => {
      db.query(
        `SELECT u.id,u.username,u.email,u.phone_number,u.image,w.balance FROM users AS u INNER JOIN wallets AS w ON u.id=$1 AND w.user_id=$1`,
        [id],
        (error, result) => {
          if (error) return failed(error.message);
          if (result.rows.length === 0) return failed("Id not found!");
          return success(result.rows[0]);
        }
      );
    });
  },
  edit: ({ id, pin_number, phone_number, image }) => {
    return new Promise((success, failed) => {
      db.query(`SELECT * FROM users WHERE id=$1`, [id], (error, result) => {
        if (error) return failed(error.message);
        if (result.rows.length === 0) return failed("Id not found!");
        db.query(
          `UPDATE users SET pin_number=$1,phone_number=$2,image=$3 WHERE id=$4`,
          [
            pin_number || result.rows[0].pin_number,
            phone_number || result.rows[0].phone_number,
            image ? image.filename : result.rows[0].image,
            id,
          ],
          (err) => {
            if (err) return failed(err.message);
            if (image) {
              db.query(
                `UPDATE transactions SET subject_image=$1 WHERE subject_id=$2`,
                [image.filename, id],
                (errors) => {
                  if (errors) return failed(errors.message);
                  return success("Success update!");
                }
              );
            }
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
        bcrypt.compare(
          pin.toString(),
          result.rows[0].pin_number,
          (err, res) => {
            if (err) return failed("You don't have a pin number yet");
            if (!res) return failed("The PIN number you entered is incorrect");
            return success("Pin is correct");
          }
        );
      });
    });
  },
  search: (queryParams) => {
    if (queryParams) {
      return `AND username ILIKE '%${queryParams}%'`;
    } else {
      return "";
    }
  },
};

// Exports
module.exports = userModel;
