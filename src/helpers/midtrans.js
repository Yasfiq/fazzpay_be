/* eslint-disable no-undef */
const midtransClient = require("midtrans-client");
const { SERVER_KEY, CLIENT_KEY } = process.env;
// Create Core API instance
let coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: SERVER_KEY,
  clientKey: CLIENT_KEY,
});

module.exports = coreApi;
