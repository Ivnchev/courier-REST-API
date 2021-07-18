const router = require('express').Router()
const Model = require('../../models/Support')
const controllers = require('../modules/controllers-factory')(Model)


const guards = require('../guards/common')

router.route('/')
    .get(guards.isAdmin,controllers.getAll)
    .post(controllers.createOne)

router.route('/:id')
    .get(guards.isAdmin, controllers.getOne)
    .put(guards.isAdmin, controllers.updateOne)
    .delete(guards.isAdmin, controllers.deleteOne)

module.exports = router