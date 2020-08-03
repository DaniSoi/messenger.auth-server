const { userService } = require('../services');

async function handleRegister (request, response, next) {
  try {
    const { error, user } = await userService.register(request.body);
    if (error) {
      response.set('X-Status-Reason', error);
      return response.status(409).end(error);
    }

    response.status(201).send(user);
  } catch (e) {
    next(e);
  }
}

async function handleGetUserById (request, response, next) {
  try {
    const { error, user } = await userService.getUserById(request.params.id);
    if (error) return response.status(400).end(error);

    response.send(user);
  } catch (e) {
    next(e);
  }
}

async function handleGetUsers (request, response, next) {
  try {
    const targetUsersFilter = request.query;
    const { error, users } = await userService.getUsersGroup(targetUsersFilter);
    if (error) return response.status(400).end(error);

    response.send(users);
  } catch (e) {
    next(e);
  }
}

async function handleUserConfirmation (request, response, next) {
  try {
    const { error, user } = await userService.confirmUser(request.body.token);
    if (error) return response.status(400).end(error);

    response.status(201).send(user);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  handleRegister,
  handleGetUserById,
  handleUserConfirmation,
  handleGetUsers
};
