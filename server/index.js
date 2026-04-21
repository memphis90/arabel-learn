'use strict'
require('dotenv').config()
const app    = require('./app')
const config = require('./config')

app.listen(config.app.port, () => {
  console.log(`[learn] server running on port ${config.app.port}`)
})
