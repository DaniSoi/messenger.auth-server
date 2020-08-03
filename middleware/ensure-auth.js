const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));

async function ensureAuth (req, res, next) {
  const authHeader = req.headers.authorization;
  // Auth header format: "Bearer TOKEN"
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const user = await jwt.verifyAsync(token, process.env.ACCESS_TOKEN_SECRET);
    if (!user) return res.sendStatus(403);

    req.user = user;
    next();
  } catch (e) {
    res.sendStatus(403);
  }
}

module.exports = ensureAuth;
