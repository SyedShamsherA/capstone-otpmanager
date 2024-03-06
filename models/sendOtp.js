const mongoose = require('mongoose');

const sendOtpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
  expirationTime: { type: Date, required: true },
  status: { type: String, enum: ['unused', 'used', 'expired', 'failed', 'blacklisted'], default: 'unused' },
  apikey: {
    type: String,
    required: true
  }
});

const sendOtp = mongoose.model('sendOtp', sendOtpSchema);

module.exports = sendOtp;
