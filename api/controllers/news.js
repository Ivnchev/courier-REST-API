const router = require('express').Router()
const Model = require('../../models/News')
const controllers = require('../modules/controllers-factory')(Model)

const guards = require('../guards/common')


router.route('/')
    .get(controllers.getAll)
    .post(guards.isAdmin, controllers.createOne)

router.route('/:id')
    .get(controllers.getOne)
    .put(guards.isAdmin, controllers.updateOne)
    .delete(guards.isAdmin, controllers.deleteOne)

module.exports = router