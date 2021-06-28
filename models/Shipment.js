const mongoose = require('mongoose')


const shipmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    destination: {
        type: String,
        required: [true, 'Destination is required!'],
        minLength: [4, 'Destination must be at least 4 characters !']
    },
    shipmentType: {
        type: String,
        default: 'economy',
        required: [true, 'Shipment Type is required!'],
        enum: {
            values: ['economy', 'express'],
            message: '{VALUE} is incorrect!'
        }
    },
    packageAddress: {
        type: String,
        required: [true, 'Package Address is required!'],
        minLength: [10, 'Package Address must be at least 10 characters !']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [1, 'Price should be at least 1$ !']
    }
})


module.exports = mongoose.model('shipment', shipmentSchema)