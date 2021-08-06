const router = require('express').Router()
const claimService = require('../services/claim.service')



router.route('/')
    .get(function (req, res, next) {
        const isAdmin = req.user.role === 'admin'
        const userId = req.user._id
        claimService.getAll(isAdmin, userId)
            .then(data => {
                res.status(200).json(data)
            }).catch(next)
    })
    .post(function (req, res, next) {
        const data = { ...req.body, creator: req.user._id }
        claimService.postClaim(data, req.user._id)
            .then(data => {
                res.status(200).json(data)
            }).catch(next)
    })

router.route('/:id')
    .get(function (req, res, next) {
        claimService.getOne(req.params.id)
            .then(data => {
                res.json(data)
            })
            .catch(next)
    })
    .put(function (req, res, next) {
        const data = { ...req.body }
        claimService.updateOne(req.params.id, req.user._id, req.user.role, data)
            .then(data => {
                res.json(data)
            })
            .catch(next)
    })
    .delete(function (req, res, next) {
        claimService.deleteClaim(req.params.id, req.user._id, req.user.role)
            .then(data => {
                res.status(200).json(data)
            }).catch(next)
    })

module.exports = router