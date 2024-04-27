const Otp = require('../models/Otp')
const ObjectId = require('mongodb').ObjectId;

const validateOtp = async (req, res) => {
    const { otp } = req.body
    try {
        console.log(req.userId);
        const validOtp = await Otp.findOne({ userId: req.userId, status: 'unused' }).sort({ createdAt: -1 })
        console.log(validOtp)
        if (validOtp) {
            return res.status(200).json({ message: 'otp validated successfully' })
            validOtp.status = 'used';
            await validOtp.save()
        }
        else {
            return res.status(400).json({ message: 'Invalid Otp' })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = validateOtp