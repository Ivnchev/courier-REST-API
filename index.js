global._basedir = __dirname
const path = require('path')
const app = require('express')()
const api = require('./api')
const globalErrorHandler = require('./api/middlewares/globalErrorHandler')
const counter = require('./api/services/counter.service')
const { server: { PORT, baseUrl }, production } = require('./config/environment')

require('./config/mongoose')
require('./config/express')(app)

api.connect('/api/v1', app)

counter.start()

app.listen(PORT, () => { console.log(production ? `Server is listening on: ${baseUrl}` : 'Server is listening on http://localhost:' + PORT); })

if (production) {
    app.get("*", (req, res) => {
        res.sendFile(path.join(global._basedir, 'dist/courier-application/index.html'));
    });
}

app.use(globalErrorHandler)