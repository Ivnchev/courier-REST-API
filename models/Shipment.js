const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Destination is required!'],
        minLength: [10, 'Destination must be at least 10 characters !']
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
    size: {
        type: String,
        required: [true, 'Package size is required!'],
        match: [/\d{2,3}\/\d{2,3}\/\d{2,3}/, 'Package size should looks like 120/80/40!'],
    },
    weight: {
        type: Number,
        required: [true, 'Shipment weight is required!'],
        min: [2, 'Shipment weight should be greater than 2kg!'],
        max: [100, 'Shipment weight should be less than 100kg!'],
    },
    cost: {
        type: Number,
        required: [true, 'Price is required!'],
        min: [20, 'Price should be at least 20$ !']
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
})


module.exports = mongoose.model('shipment', schema)