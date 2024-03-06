const mongoose = require('mongoose')

const dashboardSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    totalOtps: {type: Number, default: 0},
    validatedOps: {type: Number, default: 0}
})

const Dashboard = mongoose.model('Dashboard', dashboardSchema)
module.exports = Dashboard