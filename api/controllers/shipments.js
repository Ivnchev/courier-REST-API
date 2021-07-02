const router = require('express').Router()
const shipmentModel = require('../../models/Shipment')
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
            cost: req.body.shipmenType == 'economy' ? 20 : 40
        }
        shipmentService.postShipment(data, req.user._id)
            .then(data => {
                res.status(200).json(data)
            }).catch(next)
    })

router.route('/:id')
    // .get(controllers.getOne)
    // .put(controllers.updateOne)
    // .delete(controllers.deleteOne)

module.exports = router