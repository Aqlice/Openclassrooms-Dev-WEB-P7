const dbc = require("../db")
const db = dbc.getDB()

exports.getAllPost = (req, res, next) => {
    const sql = `SELECT post.id AS post_id, post.pic AS post_pic, post.message, post.creation_time, post.user_id as post_user_id, user.fname as post_user_name FROM post JOIN user ON post.user_id = user.UID`
    db.query(sql, async (err, result) => {
        if (err)
            throw err
        else {
            console.log(result)
            return res.status(200).json(result)
        }
    })
}

exports.createPost = (req, res, next) => {
    const sql = `INSERT INTO post SET ?`
    const newPost = {
        message: req.body.message,
        user_id: req.body.user_id
    }
    db.query(sql, newPost, (err, result) => {
        if (err)
            throw err
        else
            return res.status(200).json(result)
    })
}

exports.deletePost = (req, res, next) => {
    const sql = `DELETE FROM post WHERE post.id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            throw err
        }
        else
            return res.status(200).json(result)
    })
}

exports.getComments = (req, res, next) => {
    const sql = `SELECT * FROM comments WHERE post_id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            throw err
        }
        else
            return res.status(200).json(result)
    })
}

exports.createComment = (req, res, next) => {
    const sql = `INSERT INTO comments SET ?`
    const newCom = {
        comment: req.body.comment,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    }
    db.query(sql, newCom, (err, result) => {
        if (err)
            throw err
        else
            return res.status(200).json(result)
    })
}