const Otp = require('../models/Otp');
const generateOTP = require('../utils/generateOTP')

// const generateOTP = (length) => {
//     return otpGenerator.generate(length, {digits: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, specialChars: false})
// }

module.exports = {
  generateOtp: async (req, res) => {
    const { userId } = req.body;

    try {
      // Generate a random OTP 
      const otp = generateOTP()

      const expirationTime = new Date();
      expirationTime.setMinutes(expirationTime.getMinutes() + 5);

      // new OTP record
      const newOtp = new Otp({
        userId,
        otp,
        expirationTime,
      });

      await newOtp.save();

      res.status(201).json({ otp, message: 'OTP generated successfully' });
    } catch (error) {
      console.error('Generate OTP Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
