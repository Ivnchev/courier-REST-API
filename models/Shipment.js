const mongoose = require('mongoose')


const shipmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    destination: {
        type: String,
        required: true
    },
    packageType: {
        type: String,
        default: 'economy',
        required: true
    },
    packageAddress: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('shipment', shipmentSchema)