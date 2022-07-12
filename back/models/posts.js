const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const fs = require('fs');
const dbc = require("../db")

const db = dbc.getDB()

exports.getAllPostsData = (req, res, next) => {
    const sql = `SELECT post.id AS post_id, post.pic AS post_pic, post.message, post.creation_time, post.user_id as post_user_id, user.fname as post_user_name, user.pic, COUNT(likes.post_id) AS total_like FROM post JOIN user ON post.user_id = user.UID LEFT JOIN likes ON post.id = likes.post_id GROUP BY post.id ORDER by creation_time DESC`
    db.query(sql, async (err, result) => {
        if (err)
            throw err
        else
            return res.status(200).json(result)
    })
}

exports.createPostData = async (newPost, res, next) => {
    const sql = `INSERT INTO post SET ?`
    db.query(sql, newPost, async (err, result) => {
        if (err)
            throw err
        else
            return res.status(200).json(result)
    })
}

exports.deletePostData = (req, res, next) => {
    const sql = `SELECT pic FROM post WHERE post.id = ?`
    db.query(sql, req.params.id, async (err, result) => {
        if (err)
            throw err
        else {
            if (result[0].pic !== null) {
                const fileName = result[0].pic.split("images/")[1]
                fs.unlink(`images/${fileName}`, () => {
                    if (err)
                        throw err
                    else {
                        const sql = `DELETE FROM post WHERE post.id = ?`
                        db.query(sql, req.params.id, async (err, result) => {
                            if (err)
                                throw err
                            else
                                return res.status(200).json(result)
                        })
                    }
                })
            }
            else {
                const sql = `DELETE FROM post WHERE post.id = ?`
                db.query(sql, req.params.id, async (err, result) => {
                    if (err)
                        throw err
                    else
                        return res.status(200).json(result)
                })
            }
        }
    })
}

exports.deleteComData = (req, res, next) => {
    const sql = `DELETE FROM comments WHERE id = ?`
    db.query(sql, req.params.id, async (err, result) => {
        if (err)
            throw err
        else
            return res.status(200).json(result)
    })
}

exports.getCommentsData = (req, res, next) => {
    const sql = `SELECT comments.id, comments.user_id, comments.post_id, comments.comment,comments.creation_date, user.fName FROM comments JOIN user on comments.user_id = user.UID WHERE post_id = ?`
    db.query(sql, req.params.id, async (err, result) => {
        if (err)
            throw err
        else {
            return res.status(200).json(result)
        }
        return res.status(200).json(result)
    })
}

exports.createCommentData = (newCom, res, next) => {

    const sql = `INSERT INTO comments SET ?`
    db.query(sql, newCom, async (err, result) => {
        if (err)
            throw err
        else
            return res.status(200).json(result)
    })

}

exports.getPostsFromUserData = (req, res, next) => {
    const sql = `SELECT post.id AS post_id, post.pic AS post_pic, post.message, post.creation_time, post.user_id as post_user_id, user.fname as post_user_name, user.pic, COUNT(likes.post_id) AS total_like FROM post LEFT JOIN user ON UID = ? LEFT JOIN likes ON post.id = likes.post_id WHERE post.user_id = ? GROUP BY post.id`
    db.query(sql, [req.params.id, req.params.id], async (err, result) => {
        if (err)
            throw err
        else {
            return res.status(200).json(result)
        }
    })
}

exports.addLikeData = (req, res, next) => {
    const sql = ` SELECT * FROM likes WHERE user_id = ? AND post_id = ?`
    db.query(sql, [req.body.user_id, req.body.post_id], async (err, result) => {
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
            const sql = `DELETE FROM likes WHERE user_id = ? AND post_id = ?`
            db.query(sql, [req.body.user_id, req.body.post_id], async (err, result) => {
                if (err)
                    throw err
                res.status(200).json()
            })
        }
    })
}

exports.modifyPostData = async (req, res, next) => {

    let updated = {}
    if (req.body.message) {
        updated = { ...updated, message: req.body.message }
    }
    if (req.file) {
        updated = { ...updated, pic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
        console.log("req id", req.params.id)
        const sql = `SELECT pic FROM post WHERE post.id = ?`
        db.query(sql, req.params.id, async (err, result) => {
            if (err)
                throw err
            else {
                console.log(result[0].pic)
                if (result[0].pic !== null) {
                    const fileName = result[0].pic.split("images/")[1]
                    console.log(fileName)
                    fs.unlink(`images/${fileName}`, () => {
                        if (err)
                            throw err
                    })
                }
            }
        })
    }
    const sql = `UPDATE post SET ? WHERE ID=?`
    db.query(sql, [updated, req.params.id], async (err, result) => {
        if (err)
            throw err
        else
            res.status(200).json(result)
    })
}