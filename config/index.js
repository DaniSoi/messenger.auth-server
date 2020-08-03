const smtpConfig = require('./mail-smtp-config');

const { NODE_ENV, ...restEnvVars } = process.env;

// noinspection JSIncompatibleTypesComparison
module.exports = {
  smtpConfig,
  IS_PROD: NODE_ENV === 'production',
  ...restEnvVars
};
