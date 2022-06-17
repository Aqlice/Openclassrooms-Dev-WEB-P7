const dbc = require("../db")
const db = dbc.getDB()

exports.getAllPost = (req, res, next) => {
    const sql = `SELECT user.id AS user_id, user.UID, user.name, user.fname, user.mail, user.pic, post.id AS post_id, post.pic AS post_pic, post.message, post.creation_time, post.user_id as post_user_id, comments.id AS comment_id, comments.comment, comments.user_id AS comment_user_id, comments.post_id AS comment_post_id, comments.creation_date FROM post LEFT JOIN comments ON comments.post_id = post.id LEFT JOIN user ON user.UID = comments.user_id`
    db.query(sql, async (err, result) => {
        if (err)
            throw err
        else
            return res.status(200).json(result)
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