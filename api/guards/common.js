const { security: { HEADER, SECRET, COOKIE_NAME } } = require('../../config/environment')
const jwt = require('jsonwebtoken')

const isAdmin = function (req, res, next) {
    if (req.user.role != 'admin') {
        return res.status(204).send('You don\'t have premissions!')
    }
    next()
}

const isLogged = function (req, res, next) {
    const token = req.headers[HEADER] || req.cookies[COOKIE_NAME]
    if (token) {
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err) { return next(err) }
            next()
        })
    }
    return
}



module.exports = {
    isAdmin,
    isLogged
}