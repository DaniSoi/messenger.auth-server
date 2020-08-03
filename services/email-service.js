const nodeMailer = require('nodemailer');
const { smtpConfig } = require('../config')

const transporter = nodeMailer.createTransport(smtpConfig);

transporter.verify(error => {
  if (error) {
    console.log('Mail Transporter Error: \n', error);
  } else {
    console.log("Mailer Transporter: connection verified.");
  }
});

async function sendEmail (emailTemplate) {
  return transporter.sendMail({ ...emailTemplate });
}

module.exports = {
  sendEmail
};
