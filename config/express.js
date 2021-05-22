const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const { server: { CORS } } = require('../config/environment')

module.exports = function (app) {

    app.use(express.urlencoded({ extended: true }))
    app.use(cors({
        origin: CORS.urls,
        credentials: CORS.credentials,
        exposedHeaders: CORS.exposedHeaders
    }))
    app.use(bodyParser.json());
    app.use(cookieParser())


}