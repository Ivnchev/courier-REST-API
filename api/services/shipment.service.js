const shipmentModel = require('../../models/Shipment')
const userModel = require('../../models/User')

const getAll = async (isAdmin, userId) => {
    if (isAdmin) {
        return await shipmentModel.find({}).populate({ path: 'creator', select: 'username' }).sort({ 'creator': userId, 'creator': -1 })
    }
    return await shipmentModel.find({ creator: userId }).populate({ path: 'creator', select: 'username' })
}

const getOne = async (id) => await shipmentModel.findById(id)

const postShipment = async (rowData, userId) => {
    let shipment
    let user

    try {
        shipment = await shipmentModel.create(rowData)
    } catch (err) {
        throw err
    }
    try {
        user = await userModel.findByIdAndUpdate({ _id: userId }, { $push: { shipments: shipment } }, { runValidators: true })
    } catch (err) {
        throw err
    }
    return shipment
}

const deleteShipment = async (id, userId, role) => {
    let shipment
    let user

    try {
        shipment = await shipmentModel.findById(id).populate('creator')
    } catch (err) {
        throw err
    }

    if ((shipment.creator._id.toString() !== userId) && (role !== 'admin')) throw { message: 'Invalid operation!', status: 404, custom: true }
    if ((shipment.status !== 'created') && (role !== 'admin')) throw { message: 'Invalid operation!', status: 404, custom: true }

    try {
        user = await userModel.findByIdAndUpdate({ _id: shipment.creator._id }, { $pull: { shipments: id } }, { runValidators: true })
        await shipmentModel.findByIdAndRemove(id)
    } catch (err) {
        throw err
    }
    return shipment
}

const updateOne = async (id, formData, userId, role) => {
    let shipment
    try {
        shipment = await shipmentModel.findById(id).populate('creator')
    } catch (err) {
        throw err
    }
    if ((shipment.creator._id.toString() !== userId) && (role !== 'admin')) throw { message: 'Invalid operation!', status: 404, custom: true }
    if ((formData.status !== 'created') && (role !== 'admin')) throw { message: 'Invalid operation!', status: 404, custom: true }

    try {
        return await shipmentModel.findByIdAndUpdate({ _id: id }, formData, { runValidators: true })
    } catch (err) {
        throw err
    }
}


module.exports = {
    getOne,
    getAll,
    postShipment,
    deleteShipment,
    updateOne
}