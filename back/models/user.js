const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const fs = require('fs');
const dbc = require("../db")
const { fstat } = require("fs")
const db = dbc.getDB()



exports.signupData = async (req, res, next) => {
    const sql = `SELECT mail FROM user WHERE mail=?`
    db.query(sql, req.body.mail, async (err, result) => {
        if (err)
            throw err
        if (result.length != 0)
            return res.status(400).json({ error: "Utilisateur déja existant !" })
        if (req.body.password.length < 8)
            return res.status(400).json({ message: "Le mot de passe doit être de 8 caractéres minimum!" })
        else {
            bcrypt
                .hash(req.body.password, 10)
                .then((hash) => {
                    const newUser = {
                        name: req.body.name,
                        fname: req.body.fname,
                        mail: req.body.mail,
                        password: hash,
                        UID: crypto.randomUUID(),
                    }
                    let sql = "INSERT INTO user SET ?"
                    db.query(sql, newUser, (err, result) => {
                        if (err)
                            throw err
                        res.status(201).json({ message: "Utilisateur créé!" })
                    })
                })
                .catch((error) => res.status(500).json({ error }))
        }
    })
}

exports.userInfoData = (req, res, next) => {
    const sql = `SELECT name, fname, mail, admin, pic FROM user WHERE UID=?`
    db.query(sql, req.params.id, async (err, result) => {
        if (err)
            throw err
        if (result.length === 0)
            return res.status(400).json({ error: "Utilisateur non trouvé" })
        else {
            res.status(200).json(result[0])
        }
    })
}

exports.signinData = (req, res, next) => {
    const sql = `SELECT * FROM user WHERE mail=?`
    db.query(sql, req.body.mail, async (err, result) => {
        if (err)
            throw err
        if (result.length == 0)
            return res.status(400).json({ error: "Utilisateur non trouvé" })
        else {
            bcrypt.compare(req.body.password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: result[0].UID,
                        token: jwt.sign(
                            { userId: result[0].UID },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        }
    })
}

exports.searchUserData = (req, res, next) => {
    const sql = `SELECT name, fname, mail, pic, UID FROM user WHERE name=? OR fname=?`
    db.query(sql, [req.query.user, req.query.user], async (err, result) => {
        if (err)
            throw err
        if (result.length === 0)
            return res.status(400).json({ error: "Utilisateur non trouvé" })
        else
            res.status(200).json(result)
    })
}

exports.modifyUserData = (req, res, next) => {
    let updated = {
        name: req.body.name,
        fname: req.body.fname,
        mail: req.body.mail,
    }
    if (req.file) {
        const sql = `SELECT pic FROM user WHERE UID=?`
        db.query(sql, req.params.id, async (err, result) => {
            if (err)
                throw err
            else {
                const oldFileName = result[0].pic.split("images/")[1]
                if (oldFileName !== "avatar.png") {
                    fs.unlink(`images/${oldFileName}`, () => {
                        if (err)
                            throw err
                    })
                }
                updated = { ...updated, pic: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
                const sql = `UPDATE user SET ? WHERE UID=?`
                db.query(sql, [updated, req.params.id], async (err, result) => {
                    if (err)
                        throw err
                    else
                        res.status(200).json(result)
                })
            }
        })
    }
}

exports.deleteUserData = (req, res, next) => {
    const sql = `SELECT pic, UID, admin FROM user WHERE UID=?`
    db.query(sql, req.params.id, async (err, result) => {
        if (err)
            throw err
            
        else {
            const oldFileName = result[0].pic.split("images/")[1]
            if (oldFileName !== "avatar.png") {
                fs.unlink(`images/${oldFileName}`, () => {
                    if (err)
                        throw err
                })
            }
        }
        const sql = `DELETE FROM user WHERE user.UID=?`
        db.query(sql, req.params.id, async (err, result) => {
            if (err)
                throw err
            else
                res.status(200).json(result)
        })
    })
}