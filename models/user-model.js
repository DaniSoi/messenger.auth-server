const mongoose = require('mongoose');
const { UserSchema, VerifyTokenSchema } = require('./schemas');

const User = mongoose.model('User', UserSchema);
const VerifyToken = mongoose.model('VerifyToken', VerifyTokenSchema);

async function addUser (userDoc = {}) {
  const user = new User({ ...userDoc });

  return user.save();
}

async function saveVerifyToken (token = '', uid = '') {
  const verifyToken = new VerifyToken({
    _id: token,
    userId: uid
  });

  return verifyToken.save();
}

async function findUserById (uid = '') {
  return User.findById(uid);
}

async function findUserByEmail (email = '') {
  return User.findOne({ email: email }).lean();
}

async function findManyUsersByIds (userIds = []) {
  return User.find(
    { _id: { $in: userIds } },
    "-hashedPassword -isVerified"
  ).lean();
}

async function findManyUsersByEmails (emails = []) {
  return User.find(
    { email: { $in: emails } },
    "-hashedPassword -isVerified"
  ).lean();
}

async function findUidByVerifyToken (token) {
  return VerifyToken.findById(token, "userId");
}

async function confirmUser (uid = '') {
  return User.findByIdAndUpdate(uid, { $set: { isVerified: true } });
}

module.exports = {
  addUser,
  findUserById,
  findUserByEmail,
  findManyUsersByIds,
  findManyUsersByEmails,
  findUidByVerifyToken,
  confirmUser,
  saveVerifyToken
};
