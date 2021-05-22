
module.exports.parseUserData = function (req, res, next) {
    const { username, password } = req.body
    req.body = !req.body.repeatPassword
        ? { username, password }
        : {
            username,
            password,
            repeatPassword: req.body.repeatPassword,
            email: req.body.email,
            phone: req.body.phone
        }
    next()
}