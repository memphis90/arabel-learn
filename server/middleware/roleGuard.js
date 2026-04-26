'use strict'

const HIERARCHY = { user: 1, editor: 2, admin: 3 }

/**
 * Richiede che l'utente autenticato abbia almeno il ruolo specificato.
 * Usa authGuard prima di questo middleware.
 *
 * Esempio: router.delete('/corso/:id', authGuard, roleGuard('editor'), handler)
 */
module.exports = function roleGuard(minRole) {
  return function (req, res, next) {
    const userRole  = req.user?.role || 'user'
    const userLevel = HIERARCHY[userRole]  ?? 0
    const minLevel  = HIERARCHY[minRole]   ?? 99

    if (userLevel >= minLevel) return next()

    res.status(403).json({ success: false, message: 'Permessi insufficienti' })
  }
}
