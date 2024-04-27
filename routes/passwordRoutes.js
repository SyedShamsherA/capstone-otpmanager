const express = require('express')
const router = express.Router()
const { createPassword, getAllPasswords, updatePassword, deletePassword } = require('../controllers/passwordController')

// route for creating a new password
router.post('/createPassword', createPassword)

// route for getting all the stored password for the user 
router.get('/getAllPasswords', getAllPasswords)

//route for updating the password 
router.put('/updatePassword', updatePassword)

//delete password route
router.delete('/deletePassword', deletePassword)

module.exports = router