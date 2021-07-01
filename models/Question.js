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
    imageUrl: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image URL is incorrect!']
    }

})



module.exports = mongoose.model('question', schema)