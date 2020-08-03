const mongoose = require('mongoose');

const ONE_WEEK_IN_SECS = 60 * 60 * 24 * 7;

const RefreshTokenSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: ONE_WEEK_IN_SECS }
});

module.exports = RefreshTokenSchema;
