const usersRouter = require('./users-router');
const sessionsRouter = require('./sessions-router');
const router = require('express').Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);

module.exports = router;
