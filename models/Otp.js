const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
  expirationTime: { type: Date, required: true },
  status: { type: String, enum: ['unused', 'used', 'expired', 'failed', 'blacklisted'], default: 'unused' },
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
