
const mongoose = require('mongoose')


const claimSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    }

})



module.exports = mongoose.model('claim', claimSchema)