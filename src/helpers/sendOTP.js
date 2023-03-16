/* eslint-disable no-unused-vars */
const otpGenerator = require("otp-generator");

const sendOTP = (phone_number) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const accountSid = "AC8ae8b147362013aebfed2f0abb7c1fb3";
  const authToken = "4d28bf38bc561770bce2011f8ded0acc";
  const client = require("twilio")(accountSid, authToken);

  return client.messages
    .create({
      body: `Your OTP code is : ${otp}`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phone_number}`,
    })
    .then((message) => otp)
    .catch((err) => err);
};

module.exports = sendOTP;
