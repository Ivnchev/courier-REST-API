const mongoose = require('mongoose')
const { database: { DB_NAME, DB_URI } } = require('../config/environment')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect(DB_URI + DB_NAME, options)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error: '))
db.once('open', function () {
    console.log('Database connected!');
})


module.exports = db