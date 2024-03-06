const sendOtp = require('../models/sendOtp')
const generateOTP = require('../utils/generateOTP')

// const generateOTP = (length) => {
//     return otpGenerator.generate(length, {digits: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, specialChars: false})
// }

module.exports = {
  generateOtp: async (req, res) => {

    try {
      // Generate a random OTP 
      console.log("hello")
      const otp = generateOTP()

      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 5);
      const userId = req.user.existingUser
      const apikey = req.user.apikey
      // new OTP record
      const newOtp = new sendOtp({
        userId,
        apikey,
        otp,
        expirationTime, 
      });

      await newOtp.save();

      res.status(201).json({ otp, message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Generate OTP Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
