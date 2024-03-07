const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken')

// User Signup
router.post('/user/signup', authController.userSignup);

// User Login
router.post('/user/login', authController.userLogin);

// Admin Signup
router.post('/admin/signup', authController.adminSignup);

// Admin Login
router.post('/admin/login', authController.adminLogin);

//user details
router.get('/userdetails', verifyToken, authController.forgettingUserDetails)

module.exports = router;
