const router = require('express').Router()
const userRouter = require('./controllers/users')
const authRouter = require('./controllers/auth')
const claimRouter = require('./controllers/claims')
const shipmentRouter = require('./controllers/shipments')
const newsRouter = require('./controllers/news')
const questionRouter = require('./controllers/question')
const supportRouter = require('./controllers/support')
const counterRouter = require('./controllers/counter')
const guards = require('./guards/common')


module.exports.connect = function (path, app) {

    router.use('/auth', authRouter)
    router.use('/users', guards.isLogged, userRouter)
    router.use('/claims', guards.isLogged, claimRouter)
    router.use('/shipments', guards.isLogged, shipmentRouter)
    router.use('/news', newsRouter)
    router.use('/counter', counterRouter)
    router.use('/support', supportRouter)
    router.use('/question-and-answers', questionRouter)

    app.use(path, router)
}