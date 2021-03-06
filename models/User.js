const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { security: { SALT_ROUNDS } } = require('../config/environment')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [4, 'Username must be at least 4 characters !']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password must be at least 4 characters !']
    },
    gender: {
        type: String,
        default: 'male',
        enum: ['male', 'female']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image should be a valid http url!'],
        default: '../../assets/images/user-logo.png',
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        match: [/^[A-Za-z0-9]+@\w+\.\w{2,3}$/g, 'Email should be a valid!']
    },
    shipments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'shipment'
        }
    ],
    claims: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'claim'
        }
    ],
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
})

schema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password)
}

schema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next()
        return
    }
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash
            next()
        })
        .catch(next)
})



module.exports = mongoose.model('user', schema)