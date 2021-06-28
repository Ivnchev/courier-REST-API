const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { security: { SECRET } } = require('../../config/environment')

const register = async function ({ username, password, email, role }) {

    const user = await User.findOne({ username: username, email: email })

    if (user) throw { errors: [{ message: 'There is a user registered with that email!', status: 204 }] }

    const data = await User.create({ username, password, email, role })

    if (!data) throw { errors: [{ message: 'Invalid username or password!', status: 204 }] }

    return login(username, password)
}

const login = async function (username, password) {
    const data = await User.findOne({ username })

    if (!data) throw { errors: [{ message: 'Invalid username or password!', status: 204 }] }

    const isCorrectPassword = await data.comparePasswords(password)

    if (!isCorrectPassword) throw { errors: [{ message: 'Invalid username or password!', status: 204 }] }

    const user = {
        _id: data._id,
        username: data.username,
        email: data.email,
        role: data.role
    }

    const token = jwt.sign(user, SECRET)

    return { token, user }
}

const logout = async function (req) {

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