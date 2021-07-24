const router = require('express').Router()
const service = require('../services/counter.service')

router.route('/')
    .get(function (req, res, next) {
        service.getAll()
            .then(data => {
                res.json(data)
            }).catch(next)
    })
    .post(function (req, res, next) {
        service.post()
            .then(data => {
                res.json(data)
            }).catch(next)
    })

module.exports = router