const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { security: { SECRET, HEADER, COOKIE_NAME } } = require('../../config/environment')

const register = async function ({ username, password, email, role, gender, image }) {

    const findUser = await User.findOne({ username: username, email: email })

    if (findUser) throw { message: 'Invalid username or password!', status: 404 } 

    const data = await User.create({ username, password, email, role, gender, image })

    if (!data) throw { message: 'Invalid username or password!', status: 404 } 

    const user = {
        _id: data._id,
        username: data.username,
        email: data.email,
        image: data.image,
        role: data.role
    }

    const token = jwt.sign(user, SECRET)

    return { user, token }
}

const login = async function ({ username, password }) {
    const data = await User.findOne({ username })

    if (!data) throw { message: 'Invalid username or password!', status: 404 } 

    const isCorrectPassword = await data.comparePasswords(password)

    if (!isCorrectPassword) throw { message: 'Invalid username or password!', status: 404 } 

    const user = {
        _id: data._id,
        username: data.username,
        email: data.email,
        image: data.image,
        role: data.role
    }

    const token = jwt.sign(user, SECRET)

    return { user, token }
}

const logout = async function (req, res) {

    const isLogout = new Promise((resolve, reject) => {
        const token = req.cookies[COOKIE_NAME] || req.headers[HEADER] || null
        if (token) {
            res.clearCookie(COOKIE_NAME)
            return resolve(token)
        }
        return reject(token)
    })
    return isLogout

}

const user = async function (req) {
    if(req.user){
        return req.user
    }
    return undefined
}

module.exports = {
    user,
    register,
    login,
    logout
}