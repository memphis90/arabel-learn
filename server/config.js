'use strict'
require('dotenv').config()

module.exports = {
  app: {
    port:  parseInt(process.env.APP_PORT || '3001', 10),
    env:   process.env.APP_ENV || 'development',
    isDev: (process.env.APP_ENV || 'development') === 'development',
  },
  db: {
    host:     process.env.DB_HOST || '127.0.0.1',
    port:     parseInt(process.env.DB_PORT || '3306', 10),
    name:     process.env.DB_NAME || 'arabel',
    user:     process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
  },
  jwt: {
    secret:    process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:5174').split(',').map(s => s.trim()),
  },
  google: {
    clientId:     process.env.GOOGLE_CLIENT_ID     || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl:  process.env.GOOGLE_CALLBACK_URL  || 'http://localhost:3001/api/auth/google/callback',
    frontendUrl:  process.env.FRONTEND_URL         || 'http://localhost:5174',
  },
  magicLink: {
    baseUrl:        process.env.MAGIC_LINK_BASE_URL || 'http://localhost:5174',
    expiresMinutes: parseInt(process.env.MAGIC_LINK_EXPIRES_MINUTES || '15', 10),
  },
  resend: {
    apiKey:   process.env.RESEND_API_KEY,
    mailFrom: process.env.MAIL_FROM || 'Arabel <no-reply@arabel.dev>',
  },
}
