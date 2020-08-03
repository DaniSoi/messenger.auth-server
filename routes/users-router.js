const { userController } = require('../controllers');
const { validateRegister, validateToken,
  validateUsersGroup, validateIdParam } = require('../middleware');
const router = require('express').Router();

router.get('/:id', validateIdParam, userController.handleGetUserById);

router.route('/')
      .get(validateUsersGroup, userController.handleGetUsers)
      .post(validateRegister, userController.handleRegister);

router.post('/confirmation', validateToken, userController.handleUserConfirmation);

module.exports = router;
