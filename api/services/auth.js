const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { security: { SECRET } } = require('../../config/environment')

const register = async function (rowData) {
    const user = new User(rowData)
    const data = await user.save()
    if (!data) { throw { message: 'Invalid username or password!', status: 204 } }
    return data
}

const login = async function ({ username, password }) {
    const user = await User.findOne({ username })
    if (!user) {
        throw { message: 'Invalid username or password!', status: 204 }
    }

    const isCorrectPassword = await user.comparePasswords(password)

    if (!isCorrectPassword) { throw { message: 'Invalid username or password!', status: 204 } }

    const userData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        // role: user.role
    }

    const token = jwt.sign(userData, SECRET)

    return { token, userData }
}

const logout = async function (req, res) {

    const isLogout = new Promise((resolve, reject) => {
        const cookie = req.cookies[COOKIE_NAME] || null
        if (cookie) {
            return resolve(cookie)
        }
        return reject(cookie)
    })

    return isLogout

}

module.exports = {
    register,
    login,
    logout
}