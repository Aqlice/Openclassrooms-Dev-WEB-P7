const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require("../middleware/multer-config")

const postCtrl = require('../controllers/post.controller');

router.get('/', auth, postCtrl.getAllPost)
router.post('/', auth, multer, postCtrl.createPost)
router.delete('/:id', auth, postCtrl.deletePost)
router.get('/:id', auth, postCtrl.getComments)
router.post('/comments', auth, postCtrl.createComment)
router.post('/like', auth, postCtrl.addLike)
router.delete('/com/:id', auth, postCtrl.deleteCom)
router.get('/getposts/:id', auth, postCtrl.getPostsFromUser)
router.put('/modifypost/:id', auth, multer, postCtrl.modifyPost)

module.exports = router