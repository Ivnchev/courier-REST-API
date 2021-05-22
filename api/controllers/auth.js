const router = require('express').Router()
const authService = require('../services/auth')
const middleware = require('../middlewares/user-data')
const { security: { COOKIE_NAME } } = require('../../config/environment')


router.post('/login',
    middleware.parseUserData,
    function (req, res, next) {
        authService.login(req.body)
            .then(({ token, userData }) => {
                res.cookie(COOKIE_NAME, token, { httpOnly: true })
            })
            .catch(next)
    })
router.post('/register',
    middleware.parseUserData,
    function (req, res, next) {

        if (req.body.password !== req.body.repeatPassword) {
            throw { message: 'Invalid username or password!', status: 204 }
        }
        
        authService.register(req.body)
            .then(() => {
                res.status(200)
                    .send('Successful registration!')
            })
            .catch(next)
    }
)
router.get('/logout', function (req, res, next) {

        authService.logout(req, res)
            .then(() => {
                res.status(200)
                    .send('Successful logout!')
            })
            .catch(next)

    })

module.exports = router