const shipmentModel = require('../../models/Shipment')
const userModel = require('../../models/User')

const getAll = async (isAdmin, userId) => {
    if (isAdmin) {
        return await shipmentModel.find({})
    }
    return await shipmentModel.find({ creator: userId })
}

const postShipment = async (rowData, userId) => {

    const data = await shipmentModel.create(rowData)

    if (!data) throw { errors: [{ message: 'Invalid data!', status: 204 }] }

    const user = await userModel.findByIdAndUpdate({ _id: userId }, { $push: { shipments: data } }, { runValidators: true })

    if (!user) throw { errors: [{ message: 'Invalid user!', status: 204 }] }

    return data
}




module.exports = {
    getAll,
    postShipment,

}