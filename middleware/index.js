const errorHandler500 = require('./error-handler');
const ensureAuth = require('./ensure-auth');
const validateCredentials = require('./validate-credentials');
const validateRegister = require('./validate-registration');
const validateToken = require('./validate-token');
const validateIdParam = require('./validate-id-param');
const validateUsersGroup = require('./validate-users-group');

module.exports = {
  errorHandler500,
  ensureAuth,
  validateCredentials,
  validateRegister,
  validateToken,
  validateUsersGroup,
  validateIdParam
};
