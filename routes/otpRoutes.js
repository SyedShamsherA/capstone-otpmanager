const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');
const verifyApi = require('../middlewares/verifyApi')

// Generate OTP
router.post('/generate', verifyApi, otpController.generateOtp);

module.exports = router;