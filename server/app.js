'use strict'
require('./db') // init sutando connection

const express      = require('express')
const cors         = require('cors')
const helmet       = require('helmet')
const compression  = require('compression')
const cookieParser = require('cookie-parser')
const morgan       = require('morgan')
const path         = require('path')
const config       = require('./config')
const errorHandler = require('./middleware/errorHandler')
const passport     = require('./middleware/passport')

const app = express()

app.use(helmet({ contentSecurityPolicy: false }))
app.use(compression())
app.use(cors({ origin: config.cors.origins, credentials: true }))
app.use(express.json())
app.use(cookieParser())

if (config.app.isDev) app.use(morgan('dev'))
app.use(passport.initialize())

app.use('/api', require('./routes/index'))

// serve Vue SPA in production
if (!config.app.isDev) {
  const dist = path.join(__dirname, '../dist/app')
  app.use(express.static(dist))
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.use(errorHandler)

module.exports = app
