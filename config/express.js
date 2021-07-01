const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const { server: { CORS } } = require('../config/environment')

const auth = require('../api/middlewares/auth')

function logger(req,res,next) {
    console.log('>>>', 'METHOD: ' + req.method , 'PATH: ' + req.url);
    next()
}


module.exports = function (app) {

    app.use(express.urlencoded({ extended: true }))
    app.use(cors({
        origin: CORS.urls,
        credentials: CORS.credentials,
        exposedHeaders: CORS.exposedHeaders
    }))
    app.use(bodyParser.json());
    app.use(cookieParser())

    app.use(auth)

    app.use(logger)

}