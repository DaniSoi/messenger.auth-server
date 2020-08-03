const { sessionService } = require('../services');

async function handleLogin (request, response, next) {
  const { email, password } = request.body;
  try {
    const { error, ...result } = await sessionService.login(email, password);
    if (error) return response.status(401).end(error);

    response.status(201).send(result);
  } catch (e) {
    next(e);
  }
}

async function handleLogout (request, response, next) {
  try {
    await sessionService.logout(request.body.token);
    response.sendStatus(204);
  } catch (e) {
    next(e);
  }
}

async function handleRefreshToken (req, res, next) {
  try {
    const { error, accessToken } = await sessionService.refreshToken(req.body.token);
    if (error) return res.status(403).end(error);

    res.status(201).send(accessToken);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  handleLogin,
  handleRefreshToken,
  handleLogout
};
