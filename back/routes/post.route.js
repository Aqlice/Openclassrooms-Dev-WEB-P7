const express = require('express')
const router = express.Router()

const postCtrl = require('../controllers/post.controller');

router.get('/', postCtrl.getAllPost)
router.post('/', postCtrl.createPost)
router.delete('/:id', postCtrl.deletePost)
router.get('/:id', postCtrl.getComments)

module.exports = router