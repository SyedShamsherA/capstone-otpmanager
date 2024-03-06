const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const User = require('../models/User')

const verifyApi = async (req, res, next) => {
    const apikey = req.params.apiKey
    if(!apikey){
        return res.status(401).json({ message : 'Unauthorized' })
    }
    // jwt.verify(apiKey, JWT_SECRET, (err, user) => {
    //     if(err){
    //         return res.status(403).json({ message: 'Forbidden' })
    //     }
    //     req.user = user
    //     next()
    // })
    const existingUser = await User.findOne({ apikey });
    console.log(existingUser)
    if(existingUser){
        req.user = {existingUser: existingUser._id, apikey: apikey}
        console.log(existingUser)
        next()
    }
}

module.exports = verifyApi