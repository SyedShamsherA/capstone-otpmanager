const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.json(({ message: 'application started successfully' }))
})


// Routes
const authRoutes = require('./routes/authRoutes');
// const otpRoutes = require('./routes/otpRoutes');
const sendOtpRoutes = require('./routes/sendOtpRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const otpValidationRoute = require('./routes/otpValidationRoutes')
const passwordRoute = require('./routes/passwordRoutes')

app.use('/api/auth', authRoutes);
// app.use('/api/otp', otpRoutes);
app.use('/api/sendOtp', sendOtpRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/otpValidation', otpValidationRoute)
app.use('/api/passwordManager', passwordRoute)

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // MongoDB Connection
  connectDB();
});
