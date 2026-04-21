'use strict'

const passport       = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User           = require('../models/User')
const config         = require('../config')

if (config.google.clientId) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:     config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL:  config.google.callbackUrl,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value
          if (!email) return done(new Error('Google account has no email address'))

          let user = await User.query()
            .where('google_id', profile.id)
            .orWhere('email', email)
            .first()

          if (user) {
            const updates = { last_login: new Date() }
            if (!user.google_id) { updates.google_id = profile.id; updates.is_active = true }
            await User.query().where('id', user.id).update(updates)
            user = await User.query().where('id', user.id).first()
          } else {
            user = await User.query().create({
              email,
              name:      profile.displayName || null,
              google_id: profile.id,
              is_active: true,
              source:    'learn',
              last_login: new Date(),
            })
          }

          if (!user.is_active) return done(null, false, { message: 'Account is disabled' })
          done(null, user)
        } catch (err) {
          done(err)
        }
      },
    ),
  )
}

module.exports = passport
