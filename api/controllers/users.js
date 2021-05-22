const router = require('express').Router()
const userModel = require('../../models/User')
const controllers = require('../modules/controllers-factory')(userModel)

router.route('/')
    .get(controllers.getAll)

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.deleteOne)

module.exports = router