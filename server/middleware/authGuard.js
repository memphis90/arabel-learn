'use strict'
const jwt    = require('jsonwebtoken')
const config = require('../config')

module.exports = function authGuard(req, res, next) {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ success: false, message: 'No session' })

  try {
    req.user = jwt.verify(token, config.jwt.secret)
    next()
  } catch {
    res.status(401).json({ success: false, message: 'Session expired' })
  }
}
