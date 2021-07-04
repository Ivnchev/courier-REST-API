const shipmentModel = require('../../models/Shipment')
const userModel = require('../../models/User')

const getAll = async (isAdmin, userId) => {
    if (isAdmin) {
        return await shipmentModel.find({}).populate({ path: 'creator', select: 'username' }).sort({ 'creator': userId, 'creator': -1 })
    }
    return await shipmentModel.find({ creator: userId }).populate({ path: 'creator', select: 'username' })
}

const getOne = async (id) => {
    return await shipmentModel.findById(id)
}

const postShipment = async (rowData, userId) => {

    const data = await shipmentModel.create(rowData)

    if (!data) throw { errors: [{ message: 'Invalid data!', status: 204 }] }

    const user = await userModel.findByIdAndUpdate({ _id: userId }, { $push: { shipments: data } }, { runValidators: true })

    if (!user) throw { errors: [{ message: 'Invalid user!', status: 204 }] }

    return data
}

const deleteShipment = async (id, userId) => {

    const user = await userModel.findByIdAndUpdate({ _id: userId }, { $pull: { shipments: id } }, { runValidators: true })

    if (!user) throw { errors: [{ message: 'Invalid data!', status: 204 }] }

    const data = await shipmentModel.findByIdAndRemove(id)

    if (!data) throw { errors: [{ message: 'Invalid data!', status: 204 }] }

    return data
}

const updateOne = async (id, formData) => {
    
    const data = await shipmentModel.findByIdAndUpdate({ _id: id }, formData, { runValidators: true })

    if (!data) throw { errors: [{ message: 'Invalid data!', status: 204 }] }

    return data

}


module.exports = {
    getOne,
    getAll,
    postShipment,
    deleteShipment,
    updateOne
}