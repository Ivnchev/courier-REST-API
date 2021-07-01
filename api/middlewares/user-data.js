
module.exports.parseUserData = function (req, res, next) {
    const { username, password } = req.body
    req.body = !req.body.rePassword
        ? { username, password }
        : {
            username,
            password,
            rePassword: req.body.rePassword,
            email: req.body.email,
            role: req.body.role,
            image: req.body.image,
            gender: req.body.gender
        }
    next()
}