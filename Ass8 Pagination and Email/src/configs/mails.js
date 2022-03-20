
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8354aa3cfa957e",
    pass: "af88a903ef9fa1",
  },
});

module.exports = transport;
