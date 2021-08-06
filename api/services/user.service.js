const User = require('../../models/User')
const bcrypt = require('bcrypt')
const { security: { SALT_ROUNDS, COOKIE_NAME } } = require('../../config/environment')

const getOne = async function (id) {
    try {
        const data = await User.findById(id).populate('shipments').populate('claims')
        return data
    } catch (err) {
        throw err
    }
}


const updateUser = async function ({ username, email, image, gender, oldPassword, newPassword }) {
    try {
        const data = await User.findOne({ username })

        const isCorrectPassword = await data.comparePasswords(oldPassword)
        if (!isCorrectPassword) throw { message: 'Incorrect passwords!', status: 404, custom: true }
        const hash = await bcrypt.genSalt(SALT_ROUNDS)
            .then(salt => bcrypt.hash(newPassword, salt))
            .then(hash => hash)

        return updatedData = await User.findByIdAndUpdate(
            { _id: data._id },
            { username, email, image, gender, password: hash },
            { runValidators: true }
        )
    } catch (err) {
        throw err
    }
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
    deleteUser,
    getOne
}