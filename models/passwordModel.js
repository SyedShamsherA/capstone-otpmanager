const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    appName: { type: String, required: true },
    password: { type: String, required: true },
    // userId: String,
    //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const Password = mongoose.model('Password', passwordSchema)
module.exports = Password