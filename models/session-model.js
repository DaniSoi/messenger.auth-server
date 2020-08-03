const mongoose = require('mongoose');
const { RefreshTokenSchema } = require('./schemas');

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

async function deleteRefreshToken (token) {
  return RefreshToken.findByIdAndDelete(token);
}

async function getRefreshToken (token) {
  return RefreshToken.findById(token);
}

async function saveRefreshToken (token) {
  const refreshToken = new RefreshToken({ _id: token });

  return refreshToken.save();
}

module.exports = {
  deleteRefreshToken,
  getRefreshToken,
  saveRefreshToken
};
