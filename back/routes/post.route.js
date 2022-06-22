const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const postCtrl = require('../controllers/post.controller');

router.get('/', auth, postCtrl.getAllPost)
router.post('/', auth, postCtrl.createPost)
router.delete('/:id', auth, postCtrl.deletePost)
router.get('/:id', auth, postCtrl.getComments)
router.post('/comments', auth, postCtrl.createComment)

module.exports = router