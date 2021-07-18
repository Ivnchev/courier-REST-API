const mongoose = require('mongoose')


const schema = new mongoose.Schema({
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
    email: {
        type: String,
        required: [true, 'Email is required!'],
        match: [/^[A-Za-z0-9]+@\w+\.\w{2,3}$/g, 'Email should be a valid!']
    },
    showDetails: {
        type: Boolean,
        default: false
    }
})



module.exports = mongoose.model('support', schema)