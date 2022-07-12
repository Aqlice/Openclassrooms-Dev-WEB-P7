const modelUser = require('../models/user');

exports.signup = (req, res, next) => {
    return modelUser.signupData(req, res, next)
}

exports.signin = (req, res, next) => {
    return modelUser.signinData(req, res, next)
}

exports.userInfo = (req, res, next) => {
    return modelUser.userInfoData(req, res, next)
}

exports.searchUser = (req, res, next) => {
    return modelUser.searchUserData(req, res, next)
}

exports.modifyUser = (req, res, next) => {
    return modelUser.modifyUserData(req, res, next)
}

exports.deleteUser = (req, res, next) => {
    return modelUser.deleteUserData(req, res, next)
}