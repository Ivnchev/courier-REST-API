const router = require('express').Router()
const authService = require('../services/auth')
const middleware = require('../middlewares/user-data')
const { security: { COOKIE_NAME } } = require('../../config/environment')

router.get('/user',
    function (req, res, next) {
        authService.user(req)
            .then((data) => {
                res.json(data)
            })
            .catch(next)
    })

router.post('/login',
    middleware.parseUserData,
    function (req, res, next) {
        authService.login(req.body)
            .then((data) => {
                res.cookie(COOKIE_NAME, data.token, { httpOnly: true })
                res.status(200).json(data)
            })
            .catch(next)
    })

router.post('/register',
    middleware.parseUserData,
    function (req, res, next) {

        if (req.body.password !== req.body.rePassword) {
            throw { message: 'Invalid username or password!', status: 204 }
        }

        authService.register(req.body)
            .then((data) => {
                res.cookie(COOKIE_NAME, data.token, { httpOnly: true })
                res.status(200).json(data)
            })
            .catch(next)
    })

router.post('/logout', function (req, res, next) {
    authService.logout(req, res)
        .then(() => {
            res.status(200)
                .json('Successful logout!')
        })
        .catch(next)

})

module.exports = router