
const environment = process.env.NODE_ENV || 'dev'
const config = environment !== 'dev' ? require(`./${environment}.config.json`) : require('./dev.config.json')
config.server.PORT = process.env.PORT || config.server.PORT

module.exports = config
