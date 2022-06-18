var logger = require('./logger')

requestLogger = async (req, res, next) => {
    try {
        logger.info(`API HIT : [${req.method}] ${req.url}`)
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = requestLogger;