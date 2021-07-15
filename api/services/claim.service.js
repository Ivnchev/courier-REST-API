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
const getOne = async (id) => await claimModel.findById(id)

const postClaim = async (rowData, userId) => {
    let claim
    let user

    try {
        claim = await claimModel.create(rowData)
    } catch (err) {
        throw err
    }
    try {
        user = await userModel.findByIdAndUpdate({ _id: userId }, { $push: { claims: data } }, { runValidators: true })
    } catch (err) {
        throw err
    }
    return claim
}

const deleteClaim = async (id, userId, role) => {
    let claim
    let user

    try {
        claim = await claimModel.findById(id).populate('creator')
    } catch (err) {
        throw err
    }

    if ((claim.creator._id.toString() !== userId) && role !== 'admin') throw { message: 'Invalid data!', status: 404 }

    try {
        user = await userModel.findByIdAndUpdate({ _id: claim.creator._id }, { $pull: { claims: id } }, { runValidators: true })
        return await claimModel.findByIdAndRemove(id)
    } catch (err) {
        err
    }
}

const updateOne = async (id, formData) => {

    try {
        await claimModel.findByIdAndUpdate({ _id: id }, formData, { runValidators: true })
    } catch (err) {
        throw err
    }

}



module.exports = {
    getAll,
    getOne,
    postClaim,
    deleteClaim,
    updateOne,
}