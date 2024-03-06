const mongoose = require('mongoose')
require('dotenv').config()
const { MONGO_URL } = process.env

const connectDB = async() => {
    try {
        console.log(MONGO_URL)
       await mongoose.connect('mongodb+srv://syedshamsher9174:WwyzKXSz79URqA4s@cluster0.nthxfmj.mongodb.net/newOtp')
       console.log('Connected to mongoDb') 
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        process.exit(1)
    }
}

module.exports = connectDB