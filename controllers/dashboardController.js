const Dashboard = require('../models/dashboard')
const Otp = require('../models/Otp')
const User = require('../models/User')
const generateOTP = require('../utils/generateOTP')
const nodemailer = require('nodemailer')
const { Password } = process.env
console.log(Password)
//nodemailer configuration for getting otp when sending mail from dashboard 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'syedshamsher9174@gmail.com',
        pass: Password
    }
})

module.exports = {
    sendOtpByEmail: async (req, res) => {
        const { email } = req.body
        try {
            //this one check if the user exists with givn mail
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }
            //generate a otp
            const otp = generateOTP()
            //saving a otp data in a databse
            const newOtp = new Otp({
                userId: user._id,
                otp,
                expirationTime: new Date(new Date().getTime() + 5 * 60 * 1000)
            })
            await newOtp.save()
            // Send the OTP to the user's email
            const mailOptions = {
                from: 'syedshamsher9174@gmail.com', 
                to: email,
                subject: 'Your OTP for Dashboard Access',
                text: `Your OTP is: ${otp}, Kindly don't share for credentials with anyone.`,
            };

            const send = await transporter.sendMail(mailOptions);
            console.log(send)
            res.json({ message: 'OTP sent successfully' });
        } catch (error) {
            console.error('send otp by email error: ', error)
            res.status(500).json({ error: error })
        }
    },
    getUserDetails: async (req, res) => {
        try {
            //this will extract the apikey from request object (this comments are written in purpose to understand, What and why I 
            // am using the variable for)
            const apikey = req.apikey
            console.log(apikey)
            //now this variable will find the user apikey as give below
            const user = await User.findOne({ apikey })
            if (!user) {
                return res.status(404).json({ error: 'user not found' })
            }
            //assuming the user's ID in the request
            console.log(user)
            // const userId = req.user.id
            // reteriveing the user details
            const userDetails = await User.findOne({ apikey: user.apikey, username: user.username, email: user.email })
            if (!userDetails) {
                return res.status(404).json({ error: 'User not found' })
            }
            res.json(userDetails)
        } catch (error) {
            console.error('Get user details error:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    },

    countOtps: async (req, res) => {
        try {
            //assuming that we have the user's Id in the request 
            const userId = req.user.id
            //count the total number of otps for the user
            const totalOtps = await Otp.countDocuments({ userId })
            res.json({ totalOtps })
        } catch (error) {
            console.error('Count OTPs error:', error)
            res.status(500).json({ error: 'internal server error' })
        }
    },

    countValidatedOtps: async (req, res) => {
        try {
            // Assuming we have the user's ID in the request
            const userId = req.user.id;

            // Count the number of validated OTPs for the user
            const validatedOtps = await Otp.countDocuments({ userId, status: 'used' });

            res.json({ validatedOtps });
        } catch (error) {
            console.error('Count Validated OTPs Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    validateOtp: async (req, res) => {
        try {
            // Assuming you have the user's ID in the request
            //const userId = req.user.id;
            const { otp } = req.body;

            // Find and update the OTP status to 'used'
            const otpRecord = await Otp.findOneAndUpdate({ otp, status: 'unused' },
                { status: 'used' }, { status: 'expired' }, { status: 'failed' }, { status: 'blacklisted' });

            if (!otpRecord) {
                return res.status(404).json({ error: 'Invalid OTP' });
            }

            // Update the user's validatedOtps count in the dashboard
            await Dashboard.findOneAndUpdate({ userId }, { $inc: { validatedOtps: 1 } });

            res.json({ message: 'OTP validated successfully' });
        } catch (error) {
            console.error('Validate OTP Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};