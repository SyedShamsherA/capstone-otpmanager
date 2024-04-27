const express = require('express')
const router = express.Router()
const validateOtp  = require('../controllers/otpValidationController')
const otpValidationMiddleware = require('../middlewares/otpValidationMiddleware')

router.post('/validate',otpValidationMiddleware, validateOtp)

module.exports = router