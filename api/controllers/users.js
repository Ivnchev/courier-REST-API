const router = require('express').Router()
const userModel = require('../../models/User')
const controllers = require('../modules/controllers-factory')(userModel)
const userService = require('../services/user.service')

router.route('/')
    .get(controllers.getAll)

router.route('/:id')
    .get(controllers.getOne)
    .put(function (req, res, next) {
        userService.updateUser(req.body)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    })
    .delete(function (req, res, next) {
        userService.deleteUser(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    })

module.exports = router