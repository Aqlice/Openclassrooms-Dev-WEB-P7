const dbc = require("../db")
const db = dbc.getDB()

exports.getAllPost = (req, res, next) => {
    const sql = `SELECT post.id AS post_id, post.pic AS post_pic, post.message, post.creation_time, post.user_id as post_user_id, user.fname as post_user_name, COUNT(likes.post_id) AS total_like FROM post JOIN user ON post.user_id = user.UID LEFT JOIN likes ON post.id = likes.post_id GROUP BY post.id`
    db.query(sql, async (err, result) => {
        if (err)
            throw err
        else {
            return res.status(200).json(result)
        }
    })
}

exports.createPost = (req, res, next) => {
    const sql = `INSERT INTO post SET ?`
    console.log("body", req.body)
    if (req.file) {
        newPost = {
            message: req.body.message,
            user_id: req.body.user_id,
            pic: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
        }
    } else {
        newPost = {
            message: req.body.message,
            user_id: req.body.user_id,
        }
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

exports.deleteCom = (req, res, next) => {
    const sql = `DELETE FROM comments WHERE id = ${req.params.id}`
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
    const sql = `SELECT comments.id, comments.user_id, comments.post_id, comments.comment,comments.creation_date, user.fName FROM comments JOIN user on comments.user_id = user.UID WHERE post_id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            throw err
        }
        else {
            console.log("lali", result)
            return res.status(200).json(result)
        }
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

exports.addLike = (req, res, next) => {
    let a = 0
    const sql = ` SELECT * FROM likes WHERE user_id = '${req.body.user_id}' AND post_id = ${req.body.post_id}`
    db.query(sql, async (err, result) => {
        if (err)
            throw err
        else if (result.length === 0) {
            const sql = `INSERT INTO likes SET ?`
            const newLike = {
                user_id: req.body.user_id,
                post_id: req.body.post_id
            }
            db.query(sql, newLike, (err, result) => {
                if (err)
                    throw err
                else
                    return res.status(200).json(result)
            })
        }
        else {
            const sql = `DELETE FROM likes WHERE user_id = '${req.body.user_id}' AND post_id = ${req.body.post_id}`
            db.query(sql, async (err, result) => {
                if (err)
                    throw err
                res.status(200).json()
            })
        }
    })
}