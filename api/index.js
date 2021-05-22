const router = require('express').Router()
const userRouter = require('./controllers/users')
const authRouter = require('./controllers/auth')
const claimRouter = require('./controllers/claims')
const shipmentRouter = require('./controllers/shipments')

module.exports.connect = function (path, app) {
    
    router.use('/auth', authRouter)
    router.use('/users', userRouter)
    router.use('/claims', claimRouter)
    router.use('/shipments', shipmentRouter)
    
    app.use(path, router)
}