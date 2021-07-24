
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    counter: {
        type: Number,
        default: 1,
    }
})

module.exports = mongoose.model('counter', schema)