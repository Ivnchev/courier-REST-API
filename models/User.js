const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { security: { SALT_ROUNDS }} = require('../config/environment')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
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
    // role: {
    //     type: String,
    //     default: 'user',
    //     enum: ['user', 'admin']
    // }
})

userSchema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password)
}

userSchema.pre('save', function (next) {
    if(!this.isModified('password')){
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



module.exports = mongoose.model('user', userSchema)