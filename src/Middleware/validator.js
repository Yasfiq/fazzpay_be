const { check, body } = require("express-validator"); // validator
const {
  checkDuplicateEmail,
  checkDuplicateUsername,
} = require("../helpers/checkDuplicate");

const validatorRegister = [
  check("username").notEmpty().withMessage("Please fill completely!"),
  check("email").notEmpty().withMessage("Please fill completely!"),
  check("password").notEmpty().withMessage("Please fill completely!"),
  check("username")
    .isLength({ min: 5 })
    .withMessage("Password min. 5 character!")
    .isLength({ max: 36 })
    .withMessage("Username max. 36 character!"),
  check("email")
    .isEmail()
    .withMessage("Email not valid!")
    .isLength({ max: 255 })
    .withMessage("Email max. 255 character!"),
  body("email").custom(async (value) => {
    const duplicateName = await checkDuplicateEmail(value);
    if (duplicateName) {
      throw new Error("Email has been used!");
    }
    return true;
  }),
  body("username").custom(async (value) => {
    const duplicateName = await checkDuplicateUsername(value);
    if (duplicateName) {
      throw new Error("Username has been used!");
    }
    return true;
  }),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password min. 5 character!")
    .isLength({ max: 30 })
    .withMessage("Password max. 30 character!"),
  check("phone_number")
    .isMobilePhone("id-ID")
    .withMessage("Must be an Indonesian mobile phone number!"),
];

const validatorLogin = [
  check("email").notEmpty().withMessage("Please fill completely!"),
  check("password").notEmpty().withMessage("Please fill completely!"),
];

module.exports = { validatorRegister, validatorLogin };
