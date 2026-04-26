'use strict'
require('dotenv').config()

module.exports = {
  client: 'mysql2',
  connection: {
    host:     process.env.DB_HOST || '127.0.0.1',
    port:     parseInt(process.env.DB_PORT || '3306', 10),
    database: process.env.DB_NAME || 'arabel',
    user:     process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
  },
  migrations: {
    table: 'migrations',
    path:  './migrations',
  },
  models: {
    path: './models',
  },
}
