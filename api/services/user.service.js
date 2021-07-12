const User = require('../../models/User')
const bcrypt = require('bcrypt')
const { security: { SALT_ROUNDS , COOKIE_NAME} } = require('../../config/environment')
const updateUser = async function ({ username, email, image, gender, oldPassword, newPassword }) {

    const data = await User.findOne({ username })
    if (!data) throw { message: 'Invalid username or password!', status: 404 }

    const isCorrectPassword = await data.comparePasswords(oldPassword)

    if (!isCorrectPassword) throw { message: 'Invalid username or password!', status: 404 }
    let hash
    try {
        hash = await bcrypt.genSalt(SALT_ROUNDS)
            .then(salt => bcrypt.hash(newPassword, salt))
            .then(hash => hash)
    } catch (err) {
        throw err
    }
    const updatedData = await User.findByIdAndUpdate(
        { _id: data._id },
        { username, email, image, gender, password: hash },
        { runValidators: true }
    )

    if (!updatedData) throw { message: 'Invalid username or password!', status: 404 }

    return updatedData
}

const deleteUser = async function (id) {
    try {
        const data = await User.findByIdAndRemove(id)
        return data
    } catch (err) {
        throw err
    }
}



module.exports = {
    updateUser,
    deleteUser
}