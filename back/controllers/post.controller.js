const modelPost = require('../models/posts');

exports.getAllPost = (req, res, next) => {
    return modelPost.getAllPostsData(req, res, next)
}

exports.createPost = async (req, res, next) => {
    let newPost = {
        user_id: req.body.user_id,
        message: ''
    }
    if (req.body.message != "undefined") 
        newPost = {...newPost, message: req.body.message}
    if (req.file) 
        newPost = { ...newPost, pic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }

    return modelPost.createPostData(newPost, res, next)
}

exports.deletePost = (req, res, next) => {
    return modelPost.deletePostData(req, res, next)
}

exports.deleteCom = (req, res, next) => {
    return modelPost.deleteComData(req, res, next)
}

exports.getComments = (req, res, next) => {
    return modelPost.getCommentsData(req, res, next)
}

exports.createComment = (req, res, next) => {
    const newCom = {
        comment: req.body.comment,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    }
    return modelPost.createCommentData(newCom, res, next)
}

exports.getPostsFromUser = (req, res, next) => {
    return modelPost.getPostsFromUserData(req, res, next)
}

exports.addLike = (req, res, next) => {
    return modelPost.addLikeData(req, res, next)
}

exports.modifyPost = (req, res, next) => {
    return modelPost.modifyPostData(req, res, next)
}