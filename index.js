global._basedir = __dirname

const app = require('express')()
const api = require('./api')
const { server: { PORT } } = require('./config/environment')

require('./config/mongoose')
require('./config/express')(app)

api.connect('/api/v1/', app)


app.listen(PORT, () => { console.log('Server is listening on http://localhost:' + PORT); })