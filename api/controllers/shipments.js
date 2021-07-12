const router = require('express').Router()
const shipmentService = require('../services/shipment.service')


router.route('/')
    .get(function (req, res, next) {
        const isAdmin = req.user.role === 'admin'
        const userId = req.user._id
        shipmentService.getAll(isAdmin, userId)
            .then(data => {
                res.status(200).json(data)
            }).catch(next)
    })
    .post(function (req, res, next) {
        const data = {
            ...req.body,
            cost: req.body.shipmentType == 'economy' ? 20 : 40,
            creator: req.user._id,
            status: req.body.status === null ? undefined : undefined
        }
        shipmentService.postShipment(data, req.user._id)
            .then(data => {
                res.status(200).json(data)
            }).catch(next)
    })

router.route('/:id')
    .get(function (req, res, next) {
        shipmentService.getOne(req.params.id)
            .then(data => {
                res.json(data)
            })
            .catch(next)
    })
    .put(function (req, res, next) {
        const data = {
            ...req.body,
            cost: req.body.shipmentType == 'economy' ? 20 : 40,
        }
        shipmentService.updateOne(req.params.id, data)
            .then(data => {
                res.json(data)
            })
            .catch(next)
    })
    .delete(function (req, res, next) {
        shipmentService.deleteShipment(req.params.id, req.user._id)
            .then(data => {
                res.status(200).json(data)
            }).catch(next)
    })

module.exports = router