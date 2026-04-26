'use strict'
const jwt          = require('jsonwebtoken')
const bcrypt       = require('bcryptjs')
const config       = require('../config')
const User         = require('../models/User')
const UserLearnStats = require('../models/UserLearnStats')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COOKIE   = (isDev) => ({
  httpOnly: true,
  sameSite: 'lax',
  secure:   !isDev,
  maxAge:   7 * 24 * 60 * 60 * 1000,
})

function issueSession(res, user) {
  const payload = {
    id:   user.id,
    email: user.email,
    plan:  user.plan_id === 1 ? 'free' : 'pro',
    role:  user.role_name || 'user',
  }
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
  res.cookie('token', token, COOKIE(config.app.isDev))
  return payload
}

async function ensureLearnStats(userId) {
  const existing = await UserLearnStats.query().where('user_id', userId).first()
  if (!existing) {
    await UserLearnStats.query().create({
      user_id:           userId,
      xp:                0,
      level:             1,
      streak:            0,
      last_activity_date: null,
      badges:            JSON.stringify([]),
    })
  }
}

const AuthController = {
  async register(req, res, next) {
    try {
      const { email, name, password } = req.body
      if (!email || !EMAIL_RE.test(email)) {
        return res.status(422).json({ success: false, message: 'Email non valida' })
      }
      if (!password || password.length < 8) {
        return res.status(422).json({ success: false, message: 'Password minimo 8 caratteri' })
      }

      const existing = await User.query().where('email', email).first()
      if (existing) {
        return res.status(422).json({ success: false, message: 'Email già registrata' })
      }

      const hash = await bcrypt.hash(password, 12)
      const user = await User.query().create({
        email,
        name:          name?.trim() || null,
        password_hash: hash,
        is_active:     true,
        source:        'learn',
        role_id:       1,
      })

      await ensureLearnStats(user.id)
      const payload = issueSession(res, user)
      res.status(201).json({ success: true, user: payload })
    } catch (err) {
      next(err)
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(422).json({ success: false, message: 'Campi obbligatori mancanti' })
      }

      const user = await User.query().with('role').where('email', email).first()
      const INVALID = { success: false, message: 'Credenziali non valide' }

      if (!user || !user.is_active) return res.status(401).json(INVALID)
      if (!user.password_hash)      return res.status(401).json({ success: false, message: 'Usa il magic link o Google per accedere' })

      const valid = await bcrypt.compare(password, user.password_hash)
      if (!valid) return res.status(401).json(INVALID)

      await User.query().where('id', user.id).update({ last_login: new Date() })
      await ensureLearnStats(user.id)

      user.role_name = user.role?.name || 'user'
      const payload = issueSession(res, user)
      res.json({ success: true, user: payload })
    } catch (err) {
      next(err)
    }
  },

  async googleCallback(req, res, next) {
    try {
      const user = await User.query().with('role').where('id', req.user.id).first()
      await ensureLearnStats(user.id)
      user.role_name = user.role?.name || 'user'
      const payload = issueSession(res, user)
      res.redirect(`${config.google?.frontendUrl || 'http://localhost:5174'}`)
    } catch (err) {
      next(err)
    }
  },

  logout(req, res) {
    res.clearCookie('token')
    res.json({ success: true })
  },

  async me(req, res, next) {
    try {
      const user = await User.query().with('role').where('id', req.user.id).first()
      if (!user) return res.status(404).json({ success: false, message: 'Utente non trovato' })

      const stats = await UserLearnStats.query().where('user_id', user.id).first()

      res.json({
        success: true,
        user: {
          id:           user.id,
          email:        user.email,
          name:         user.name,
          plan:         user.plan_id === 1 ? 'FREE' : 'PRO',
          role:         user.role?.name || 'user',
          linkedin_url: user.linkedin_url || null,
          github_url:   user.github_url   || null,
        },
        stats: stats ? {
          xp:                stats.xp,
          level:             stats.level,
          streak:            stats.streak,
          last_activity_date: stats.last_activity_date,
          badges:            typeof stats.badges === 'string' ? JSON.parse(stats.badges) : (stats.badges || []),
        } : { xp: 0, level: 1, streak: 0, badges: [] },
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = AuthController
