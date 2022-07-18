const jwt = require('jsonwebtoken')
const Sauce = require('../models/sauce')

module.exports = (req, res, next) => {
    console.log(req.params.id)
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            const token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
            const userId = decodedToken.userId
            if(sauce.userId && sauce.userId !== userId) {
                res.status(403).json({ message: 'Requête non autorisée' })
            } else {
                next()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(401).json({ error })
        })
}