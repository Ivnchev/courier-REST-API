const mongoose = require('mongoose')
const { database: { DB_NAME, DB_URI }, production } = require('../config/environment')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

if (production) {
    mongoose.connect(DB_URI, options)
} else {
    mongoose.connect(DB_URI + DB_NAME, options)
}

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error: '))
db.once('open', function () {
    console.log('Database connected!');
})


module.exports = db