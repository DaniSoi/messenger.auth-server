const router = require('express').Router();
const { sessionController } = require('../controllers');
const { validateCredentials, validateToken, ensureAuth } = require('../middleware');

router.route('/')
   .post(validateCredentials, sessionController.handleLogin)
   .delete(ensureAuth, validateToken, sessionController.handleLogout);

router.post('/token', validateToken, sessionController.handleRefreshToken);

module.exports = router;
