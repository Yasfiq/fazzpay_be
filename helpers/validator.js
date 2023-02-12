const { check, body } = require("express-validator"); // validator
const checkDuplicate = require("./checkDuplicate");

const validatorRegister = [
  check("username").notEmpty().withMessage("Please fill completely!"),
  check("email").notEmpty().withMessage("Please fill completely!"),
  check("password").notEmpty().withMessage("Please fill completely!"),
  check("username")
    .isLength({ min: 5 })
    .withMessage("Password min. 5 character!")
    .isLength({ max: 30 })
    .withMessage("Username max. 30 character!"),
  check("email")
    .isEmail()
    .withMessage("Email not valid!")
    .isLength({ max: 255 })
    .withMessage("Email max. 255 character!"),
  body("email").custom(async (value) => {
    const duplicateName = await checkDuplicate(value);
    if (duplicateName) {
      throw new Error("Email has been used!");
    }
    return true;
  }),
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password min. 5 character!")
    .isLength({ max: 30 })
    .withMessage("Password max. 30 character!"),
];

const validatorLogin = [
  check("email").notEmpty().withMessage("Please fill completely!"),
  check("password").notEmpty().withMessage("Please fill completely!"),
];

module.exports = { validatorRegister, validatorLogin };
