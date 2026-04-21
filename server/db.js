'use strict'
const { sutando } = require('sutando')
const config      = require('./config')

sutando.addConnection({
  client: 'mysql2',
  connection: {
    host:     config.db.host,
    port:     config.db.port,
    database: config.db.name,
    user:     config.db.user,
    password: config.db.password,
  },
})

module.exports = sutando
