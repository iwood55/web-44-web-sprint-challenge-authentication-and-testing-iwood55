const Users = require('../users/users-model');

const checkPayload = (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(404).json({message: 'username and password required'})
        } else {
            req.username = username
            req.password = password
            next()
        }
    } catch (err) {
        next(err)
    }
}

const uniqueUsername = async (req, res, next) => {
    try {
        const existingUsername = await Users.findByUsername(req.body.username)
        if (!existingUsername.length) {
            next()
        } else {
            next({ status: 401, message: 'username already in use' })
        }
    } catch (err) {
        next(err)
    }
}

const checkLoginPayload = async (req, res, next) => {
    try {
        const user = await Users.findByUsername(req.body.username)
        const password = await Users.validatePassword(req.body.password)
        if (!user || !password) {
            next({ status: 400, message: 'invalid credentials' })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkPayload,
    uniqueUsername,
    checkLoginPayload,
};