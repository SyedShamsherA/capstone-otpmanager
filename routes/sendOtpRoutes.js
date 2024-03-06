const express = require('express');
const router = express.Router();
const otpController = require('../controllers/sendOtpController');
const verifyApi = require('../middlewares/verifyApi')

// send OTP
router.post('/:apiKey', verifyApi, otpController.generateOtp);

module.exports = router;