const User = require('../models/User')
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = process.env

const generateToken = (user) => {
    return jwt.sign({ id : user._id, email: user.email, apikey: user.apiKey } , JWT_SECRET, {
        expiresIn: '1h'
    })
}

const generateApiKey = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = {
    userSignup: async (req, res) => {
        const { username, email, password } = req.body;
    
        try {
          // Check if the email is already registered
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
          }
    
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
    
          // Create a new user
          const newUser = new User({
            username,
            email,
            password: hashedPassword,
            apikey: generateApiKey(), // Implement generateApiKey function
          });
    
          // Save the user to the database
          await newUser.save();
    
          res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
          console.error('User Signup Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

    userLogin: async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email })
            if(!user || !bcrypt.compareSync(password, user.password)){
                return res.status(401).json({ error : 'Invalid credentials' })
            }
            const token = generateToken(user)
            res.json({ token })
        } catch (error) {
            console.error('User login error: ', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    },

    adminSignup: async (req, res) => {
        const { username, email, password } = req.body;
    
        try {
          // Check if the email is already registered
          const existingAdmin = await Admin.findOne({ email });
          if (existingAdmin) {
            return res.status(400).json({ error: 'Admin with this email already exists' });
          }
    
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
    
          // Create a new admin
          const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
          });
    
          // Save the admin to the database
          await newAdmin.save();
    
          res.status(201).json({ message: 'Admin registered successfully' });
        } catch (error) {
          console.error('Admin Signup Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },

    adminLogin: async (req, res) => {
        const { email, password } = req.body
        try {
            const admin = await Admin.findOne({ email })
            if(!admin || !bcrypt.compareSync(password, admin.password)){
                return res.status(401).json({ error: 'Invalid credentials' })
            }
            const token = generateToken(admin)
            res.json(token)
        } catch (error) {
            console.error('Admin Login error: ', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}