const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const smtpConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
};

module.exports = smtpConfig;