'use strict'
const router         = require('express').Router()
const AuthController = require('../controllers/AuthController')
const authGuard      = require('../middleware/authGuard')
const passport       = require('../middleware/passport')
const config         = require('../config')

router.post('/register', AuthController.register)
router.post('/login',    AuthController.login)
router.post('/logout',   AuthController.logout)
router.get('/me',        authGuard, AuthController.me)

if (config.google.clientId) {
  router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false }),
  )
  router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${config.google.frontendUrl}/login?error=google` }),
    AuthController.googleCallback,
  )
}

module.exports = router
