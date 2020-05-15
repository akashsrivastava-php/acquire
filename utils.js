const jwt = require("jsonwebtoken");
const secret = "world is full of errors";

authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({err:'Session Exipred!'})
  
    jwt.verify(token, secret, (err,user) => {
        console.log(err)
        if (err) return res.status(403).json({err:'Invalid Authentication!'})
        req.user = user
        next()
    })
}

generateAccessToken = (username) => {
    return jwt.sign(username, secret, { expiresIn: '1800s' });
}

module.exports = { authenticateToken, generateAccessToken }