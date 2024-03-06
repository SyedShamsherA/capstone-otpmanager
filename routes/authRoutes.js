const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User Signup
router.post('/user/signup', authController.userSignup);

// User Login
router.post('/user/login', authController.userLogin);

// Admin Signup
router.post('/admin/signup', authController.adminSignup);

// Admin Login
router.post('/admin/login', authController.adminLogin);

module.exports = router;
