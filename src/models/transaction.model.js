// Imports
const db = require("../helpers/dbConnect");
const { v4: uuidv4 } = require("uuid");

const transactionModel = {
  transfer: ({
    receiver_id,
    user_id,
    username,
    user_image,
    user_phone,
    nominal,
    notes,
    time,
    phone_number,
    subject_name,
    subject_image,
  }) => {
    return new Promise((success, failed) => {
      db.query(
        `UPDATE wallets SET balance=balance - $1 WHERE user_id=$2`,
        [parseInt(nominal), user_id],
        (err) => {
          if (err) return failed(err.message);
          db.query(
            `UPDATE wallets SET balance= balance + $1 WHERE user_id=$2`,
            [parseInt(nominal), receiver_id],
            (recErr) => {
              if (recErr) return failed(recErr.message);
              db.query(
                `INSERT INTO transactions VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                [
                  uuidv4(),
                  user_id,
                  nominal,
                  notes,
                  time,
                  receiver_id,
                  phone_number,
                  subject_name,
                  subject_image,
                  "expense",
                ],
                (senderErr) => {
                  if (senderErr) return failed(senderErr.message);
                }
              );
              db.query(
                `INSERT INTO transactions VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                [
                  uuidv4(),
                  receiver_id,
                  nominal,
                  notes,
                  time,
                  user_id,
                  user_phone,
                  username,
                  user_image,
                  "income",
                ],
                (error) => {
                  if (error) return failed(error.message);
                  return success("Transfer Success!");
                }
              );
            }
          );
        }
      );
    });
  },
  history: (id) => {
    return new Promise((success, failed) => {
      db.query(
        `SELECT * FROM transactions WHERE user_id=$1`,
        [id],
        (error, result) => {
          if (error) return failed(error.message);
          if (result.rows.length === 0)
            return failed("Belum melakukan transaksi!");
          return success(result.rows);
        }
      );
    });
  },
  topup: ({ id, nominal }) => {
    return new Promise((success, failed) => {
      db.query(`SELECT * FROM wallets WHERE user_id=$1`, [id], (err, res) => {
        if (err) return failed(err.message);
        if (res.rows.length === 0) return failed("Id not found!");
        db.query(
          `UPDATE wallets SET balance=balance + $1 WHERE user_id=$2`,
          [parseInt(nominal), id],
          (error) => {
            if (error) return failed(error.message);
            return success("Topup Success!");
          }
        );
      });
    });
  },
};

module.exports = transactionModel;
