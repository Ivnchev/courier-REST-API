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
    sizes: {
        length: {
            type: Number,
            required: [true, 'Length is required!'],
            min: [5, 'Length must be at least 5 !'],
            max: [200, 'Length should be less than 200 !']
        },
        width: {
            type: Number,
            required: [true, 'Width is required!'],
            min: [5, 'Width must be at least 5 !'],
            max: [200, 'Length should be less than 200 !']
        },
        height: {
            type: Number,
            required: [true, 'Height is required!'],
            min: [5, 'Height must be at least 5 !'],
            max: [200, 'Length should be less than 200 !']
        }
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
    status: {
        type: String,
        enum: {
            values: ['created', 'transit', 'completed'],
            message: '{VALUE} is incorrect!'
        },
        default: 'created'
    },
    showDetails: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('shipment', schema)