const { security: { HEADER, SECRET, COOKIE_NAME} } = require('../../config/environment')
const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    const token = req.cookies[COOKIE_NAME] || req.headers[HEADER]
    if (token) {
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err) {
                return next(err)
            }
            req.user = decoded
        })
    }
    next()
}