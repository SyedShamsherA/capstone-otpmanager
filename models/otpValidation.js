const mongoose = require('mongoose')

const otpValidationSchema = new mongoose.Schema({
    email : String,
    otp: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const otpValidation = mongoose.model('otpsvalidate', otpValidationSchema)
module.exports = otpValidation