const jwt = require('jsonwebtoken')

exports.checkPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    const userId = decodedToken.userId
    
    if (sauce.userId && sauce.userId !== userId) {
        res.status(403).json({ message: 'Requête non autorisée' })
    } else {
        next()
    }

}