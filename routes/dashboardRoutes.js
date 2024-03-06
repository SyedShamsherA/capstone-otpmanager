const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const verifyToken = require('../middlewares/verifyToken')

//now this is the middleware, which will extract userapikey from the url parameter
const extractApikey = (req, res, next) => {
    const apikey = req.params.apikey
    req.apikey = apikey // this will attach the api key to the request object
    next()
}

router.get('/user-details/:apikey', extractApikey, dashboardController.getUserDetails);
router.get('/count-otps', verifyToken, dashboardController.countOtps);
router.get('/count-validated-otps', verifyToken, dashboardController.countValidatedOtps);
router.post('/validate-otp', verifyToken, dashboardController.validateOtp);
router.post('/send-otp-by-email', dashboardController.sendOtpByEmail)

module.exports = router;