const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user.controller')


router.post('/signup', userCtrl.signup)
router.post('/signin', userCtrl.signin)
router.get('/:id', userCtrl.userInfo)
router.put('/:id', userCtrl.modifyUser)

module.exports = router