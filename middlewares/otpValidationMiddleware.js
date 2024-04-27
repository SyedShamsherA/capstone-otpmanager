const User = require('../models/User')
const ObjectId = require('mongodb').ObjectId;

const otpValidationMiddleware = async(req , res, next) => {
    const { email } = req.body
    try {
        //this will find the user by email and extract the userId related to them
        const user = await User.findOne({ email })
        console.log(user)
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        }
        const id = user._id.valueOf();
        req.userId = id //this will attach user id to request object
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = otpValidationMiddleware