'use strict'
const UserLearnProgress = require('../models/UserLearnProgress')
const UserLearnStats    = require('../models/UserLearnStats')

// XP thresholds per level: level N requires N * 200 XP
function xpForLevel(level) { return level * 200 }

function computeLevel(xp) {
  let level = 1
  while (xp >= xpForLevel(level + 1)) level++
  return level
}

const BADGE_RULES = [
  { id: 'first_lesson',   check: (progress) => progress.length >= 1 },
  { id: 'streak_3',       check: (_, stats) => stats.streak >= 3 },
  { id: 'streak_7',       check: (_, stats) => stats.streak >= 7 },
  { id: 'node_beginner',  check: (progress) => progress.filter(p => p.item_id.startsWith('nodejs-')).length >= 5 },
  { id: 'quiz_ace',       check: (progress) => progress.some(p => p.item_type === 'quiz' && p.score === p.score_total) },
]

function computeBadges(progress, stats, existingBadges) {
  const earned = new Set(existingBadges)
  BADGE_RULES.forEach(rule => {
    if (!earned.has(rule.id) && rule.check(progress, stats)) earned.add(rule.id)
  })
  return [...earned]
}

function updateStreak(stats) {
  const today     = new Date().toISOString().slice(0, 10)
  const lastDate  = stats.last_activity_date ? String(stats.last_activity_date).slice(0, 10) : null
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)

  if (lastDate === today)      return stats.streak
  if (lastDate === yesterday)  return stats.streak + 1
  return 1
}

const LearnController = {
  async getProgress(req, res, next) {
    try {
      const userId = req.user.id

      const [progress, stats] = await Promise.all([
        UserLearnProgress.query().where('user_id', userId).get(),
        UserLearnStats.query().where('user_id', userId).first(),
      ])

      res.json({
        success:   true,
        completed: progress.map(p => p.item_id),
        stats: stats ? {
          xp:                stats.xp,
          level:             stats.level,
          xpNextLevel:       xpForLevel(stats.level + 1),
          streak:            stats.streak,
          last_activity_date: stats.last_activity_date,
          badges:            typeof stats.badges === 'string' ? JSON.parse(stats.badges) : (stats.badges || []),
        } : { xp: 0, level: 1, xpNextLevel: 200, streak: 0, badges: [] },
      })
    } catch (err) {
      next(err)
    }
  },

  async completeItem(req, res, next) {
    try {
      const userId = req.user.id
      const { item_id, item_type, xp, score, score_total } = req.body

      if (!item_id || !item_type || !xp) {
        return res.status(422).json({ success: false, message: 'item_id, item_type e xp sono obbligatori' })
      }

      // idempotent — skip if already completed
      const existing = await UserLearnProgress.query()
        .where('user_id', userId)
        .where('item_id', item_id)
        .first()

      if (existing) {
        return res.json({ success: true, alreadyCompleted: true })
      }

      await UserLearnProgress.query().create({
        user_id:      userId,
        item_id,
        item_type,
        xp_earned:    xp,
        score:        score ?? null,
        score_total:  score_total ?? null,
        completed_at: new Date(),
      })

      // update stats
      let stats = await UserLearnStats.query().where('user_id', userId).first()
      if (!stats) {
        stats = await UserLearnStats.query().create({
          user_id: userId, xp: 0, level: 1, streak: 0,
          last_activity_date: null, badges: JSON.stringify([]),
        })
      }

      const newXp      = (stats.xp || 0) + xp
      const newLevel   = computeLevel(newXp)
      const newStreak  = updateStreak(stats)
      const progress   = await UserLearnProgress.query().where('user_id', userId).get()
      const existBadges = typeof stats.badges === 'string' ? JSON.parse(stats.badges) : (stats.badges || [])
      const newBadges  = computeBadges(progress, { ...stats, streak: newStreak }, existBadges)

      await UserLearnStats.query().where('user_id', userId).update({
        xp:                newXp,
        level:             newLevel,
        streak:            newStreak,
        last_activity_date: new Date().toISOString().slice(0, 10),
        badges:            JSON.stringify(newBadges),
        updated_at:        new Date(),
      })

      res.json({
        success:     true,
        xp:          newXp,
        level:       newLevel,
        xpNextLevel: xpForLevel(newLevel + 1),
        streak:      newStreak,
        badges:      newBadges,
        newBadges:   newBadges.filter(b => !existBadges.includes(b)),
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = LearnController
