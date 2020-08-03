const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, unique: true },
  hashedPassword: { type: String, required: true, index: true },
  isVerified: { type: Boolean, default: false },
  firstName: { type: String },
  lastName: { type: String },
  birthday: { type: Date }
});

module.exports = UserSchema;
