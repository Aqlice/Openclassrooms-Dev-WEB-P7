const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const userCtrl = require('../controllers/user.controller')


router.post('/signup', userCtrl.signup)
router.post('/signin', userCtrl.signin)
router.get('/:id', auth, userCtrl.userInfo)
router.put('/:id', auth, multer, userCtrl.modifyUser)
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router