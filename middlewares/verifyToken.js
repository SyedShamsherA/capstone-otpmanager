const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({ message : 'Unauthorized' })
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({ message: err })
        }
        req.user = user
        next()
    })
}

module.exports = verifyToken