const claimModel = require('../../models/Claim')
const userModel = require('../../models/User')

const getAll = async (isAdmin, userId) => {
    if (isAdmin) {
        return await claimModel.find({})
            .populate({ path: 'creator', select: 'username' })
            .populate('trackingNumber')
            .sort({ 'creator': userId, 'creator': -1 })
    }
    return await claimModel.find({ creator: userId })
        .populate({ path: 'creator', select: 'username' })
        .populate('trackingNumber')
}
const getOne = async (id) => {
    return await claimModel.findById(id)
}

const postClaim = async (rowData, userId) => {

    const data = await claimModel.create(rowData)

    if (!data) throw { errors: [{ message: 'Invalid data!', status: 204 }] }

    const user = await userModel.findByIdAndUpdate({ _id: userId }, { $push: { claims: data } }, { runValidators: true })

    if (!user) throw { errors: [{ message: 'Invalid user!', status: 204 }] }

    return data
}

const deleteClaim = async (id, userId) => {

    const user = await userModel.findByIdAndUpdate({ _id: userId }, { $pull: { claims: id } }, { runValidators: true })

    if (!user) throw { errors: [{ message: 'Invalid data!', status: 204 }] }

    const data = await claimModel.findByIdAndRemove(id)

    if (!data) throw { errors: [{ message: 'Invalid data!', status: 204 }] }

    return data
}

const updateOne = async (id, formData) => {

    const data = await claimModel.findByIdAndUpdate({ _id: id }, formData, { runValidators: true })

    if (!data) throw { errors: [{ message: 'Invalid data!', status: 204 }] }

    return data

}



module.exports = {
    getAll,
    getOne,
    postClaim,
    deleteClaim,
    updateOne,
}