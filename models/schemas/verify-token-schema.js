const mongoose = require('mongoose');

const ONE_WEEK_IN_SECS = 60 * 60 * 24 * 7;

const VerifyTokenSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, expires: ONE_WEEK_IN_SECS }
});

module.exports = VerifyTokenSchema;
