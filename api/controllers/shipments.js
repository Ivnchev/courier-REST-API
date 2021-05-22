const router = require('express').Router()
const shipmentModel = require('../../models/Shipment')
const controllers = require('../modules/controllers-factory')(shipmentModel)

router.route('/')
    .get(controllers.getAll)
    .post(controllers.createOne)

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.deleteOne)

module.exports = router