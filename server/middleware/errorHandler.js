'use strict'
const config = require('../config')

module.exports = function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500
  const message = config.app.isDev ? err.message : 'Internal server error'
  if (config.app.isDev) console.error(err)
  res.status(status).json({ success: false, message })
}
