const passwordValidator = require("password-validator");

const schema = new passwordValidator();

schema
  .has()
  .uppercase(1, "Password should have a min. 1 uppercase letter!") // Must have uppercase letters
  .has()
  .lowercase(1, "Password should have a min. 1 lowercase letter!")
  .has()
  .digits(2, "Password should have a min. 2 digits!");

const checkPassword = (password) => {
  const result = schema.validate(password, { details: true });
  let err = false;
  if (result.length === 0) {
    // eslint-disable-next-line no-unused-vars
    err = false;
  } else {
    // eslint-disable-next-line no-unused-vars
    err = result[0].message;
  }
  // eslint-disable-next-line no-unused-vars
  return err;
};

module.exports = checkPassword;
