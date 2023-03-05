// Imports
const db = require("./dbConnect"); // Database Connection

const checkDuplicateEmail = (email) => {
  return new Promise((success, failed) => {
    db.query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
      if (error) {
        return failed(error.message);
      } else if (result.rows.length !== 0) {
        return success(result.rows);
      } else {
        return success();
      }
    });
  });
};

const checkDuplicateUsername = (username) => {
  return new Promise((success, failed) => {
    db.query(
      `SELECT * FROM users WHERE username='${username}'`,
      (error, result) => {
        if (error) {
          return failed(error.message);
        } else if (result.rows.length !== 0) {
          return success(result.rows);
        } else {
          return success();
        }
      }
    );
  });
};

// Export
module.exports = { checkDuplicateEmail, checkDuplicateUsername };
