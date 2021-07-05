
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    trackingNumber: {
        type: mongoose.Types.ObjectId,
        ref: 'shipment'
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'Title must be at least 5 characters !']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description must be at least 10 characters !']
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    showDetails: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})



module.exports = mongoose.model('claim', schema)