const Password = require('../models/passwordModel')
const Otp = require('../models/Otp')

//for creating a new password 
exports.createPassword = async (req, res) => {
    const { otp } = req.body
    const { appName, password } = req.body 
    console.log(req.body)
    try {
        const validOTP = await Otp.findOne({ otp, status:'unused' })
        console.log(validOTP, 'creating')
        if( !validOTP ){
            return res.status(400).json({ message: 'invalid otp' })
        }
        const newPassword = new Password({ email: validOTP.email, appName, password })
        await newPassword.save()
        //change the status of otp here 
        validOTP.status = 'used'
        await validOTP.save()
        return res.status(201).json({ message : 'Password created successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

//get all passwords for the user
exports.getAllPasswords = async (req, res) => {
    const { otp } = req.body
    try {
        const validOTP = await Otp.findOne({ otp, status:'used' })
        if(!validOTP){
            return res.status(400).json({ message: 'invalid otp' })
        }
        //get all passwords associated with the email in the otp
        const passwords = await Password.find({ email: validOTP.email })
        return res.status(200).json({passwords})
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

//update a password 
exports.updatePassword = async (req, res ) => {
    const { otp } = req.body
    const { appName, password } = req.body

    try {
        const validOTP = await Otp.findOne({ otp, status: 'used' })
        console.log(validOTP, 'updated');
        if(!validOTP){
            return res.status(400).json({ message: 'invalid otp' })
        }
        //update the password 
        // const updatedPassword = await Password.findByIdAndUpdate(id, { appName, password }, { new: true })
        // return res.status(200).json(updatedPassword)
        await Password.findOneAndUpdate({ email: validOTP.email, appName }, { password })
        return res.status(200).json({ message: 'Password updated successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

//deleting a password
exports.deletePassword = async (req, res) => {
    const { otp } = req.body 
    const { appName } = req.body

    try {
        const validOTP = await Otp.findOne({ otp, status: 'used' })
        if(!validOTP){
            return res.status(400).json({ message: 'invalid otp' })
        }
        //delete the password 
        await Password.findOneAndDelete({ email: validOTP.email, appName })
        return res.status(200).json({ message: 'Password deleted successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}