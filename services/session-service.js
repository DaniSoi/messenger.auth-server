const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sessionModel, userModel } = require('../models');

async function login (email, password) {
  try {
    const { error, user } = await validateUser(email, password);
    if (error) return { error };

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    await sessionModel.saveRefreshToken(refreshToken);

    return { accessToken, refreshToken };
  } catch (e) {
    console.error('sessions service - login - rethrowing error: ', e);
    throw e;
  }
}

async function validateUser (email, password) {
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return { error: 'Incorrect email.' };

    const { hashedPassword, isVerified, ...restUserDetails } = user;

    if (!isVerified) return { error: 'Unverified user.' };

    if (!(await bcrypt.compare(password, hashedPassword)))
      return { error: 'Incorrect password.' };

    return { user: { ...restUserDetails } };
  } catch (e) {
    console.error('sessions service - validateUser - rethrowing error: ', e);
    throw e;
  }
}

async function logout (refreshToken) {
  return sessionModel.deleteRefreshToken(refreshToken);
}

async function refreshToken (token) {
  try {
    const result = await sessionModel.getRefreshToken(token);
    if (!result) return { error: 'Invalid refresh token.' };

    const { iat, ...user } = await jwt.verifyAsync(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = createAccessToken(user);

    return { accessToken };
  } catch (e) {
    if (e.name === 'JsonWebTokenError')
      return { error: 'Invalid refresh token.' };

    console.error('sessions service - createSession - rethrowing error: ', e);
    throw e;
  }
}

function createAccessToken (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

function createRefreshToken (user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
  login,
  logout,
  refreshToken
};
