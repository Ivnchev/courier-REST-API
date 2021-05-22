const router = require('express').Router()
const claimModel = require('../../models/Claim')
const controllers = require('../modules/controllers-factory')(claimModel)



router.route('/')
    .get(controllers.getAll)
    .post(controllers.createOne)

router.route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.deleteOne)

module.exports = router