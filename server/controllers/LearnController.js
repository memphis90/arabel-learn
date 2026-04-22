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

function hasAll(progress, ids) {
  const done = new Set(progress.map(p => p.item_id))
  return ids.every(id => done.has(id))
}

const BADGE_RULES = [
  // ── Attività ───────────────────────────────────────────────────────────────
  { id: 'first_lesson',  check: (progress) => progress.length >= 1 },
  { id: 'streak_3',      check: (_, stats) => stats.streak >= 3 },
  { id: 'streak_7',      check: (_, stats) => stats.streak >= 7 },
  { id: 'node_beginner', check: (progress) => progress.filter(p => p.item_id.startsWith('nodejs-')).length >= 5 },
  { id: 'quiz_ace',      check: (progress) => progress.some(p => p.item_type === 'quiz' && p.score === p.score_total) },

  // ── Carriera Frontend ──────────────────────────────────────────────────────
  { id: 'junior_frontend', check: p => hasAll(p, [
    'vue-1-1', 'vue-1-2', 'vue-1-3', 'vue-1-4', 'vue-1-q',
    'ts-1-1',  'ts-1-2',  'ts-1-3',  'ts-1-q',
  ])},
  { id: 'mid_frontend', check: p => hasAll(p, [
    'vue-1-1', 'vue-1-2', 'vue-1-3', 'vue-1-4', 'vue-1-q',
    'vue-2-1', 'vue-2-2', 'vue-2-3', 'vue-2-4', 'vue-2-q',
    'nuxt-3-1', 'nuxt-3-2', 'nuxt-3-3', 'nuxt-3-4', 'nuxt-3-q',
    'ts-1-1', 'ts-1-2', 'ts-1-3', 'ts-1-q',
    'ts-2-1', 'ts-2-2', 'ts-2-3', 'ts-2-q',
  ])},

  // ── Carriera Backend JS ────────────────────────────────────────────────────
  { id: 'junior_backend', check: p => hasAll(p, [
    'nodejs-1-1', 'nodejs-1-2', 'nodejs-1-3', 'nodejs-1-q',
    'express-1-1', 'express-1-2', 'express-1-3', 'express-1-q',
    'sql-1-1', 'sql-1-2', 'sql-1-3', 'sql-1-q',
  ])},
  { id: 'mid_backend_js', check: p => hasAll(p, [
    'nodejs-1-1', 'nodejs-1-2', 'nodejs-1-3', 'nodejs-1-q',
    'nodejs-2-1', 'nodejs-2-2', 'nodejs-2-3', 'nodejs-2-4', 'nodejs-2-q',
    'nodejs-3-1', 'nodejs-3-2', 'nodejs-3-3', 'nodejs-3-4', 'nodejs-3-5', 'nodejs-3-q',
    'express-1-1', 'express-1-2', 'express-1-3', 'express-1-q',
    'express-2-1', 'express-2-2', 'express-2-3', 'express-2-q',
  ])},

  // ── Carriera PHP ───────────────────────────────────────────────────────────
  { id: 'junior_php', check: p => hasAll(p, [
    'php-1-1', 'php-1-2', 'php-1-3', 'php-1-q',
  ])},
  { id: 'mid_php', check: p => hasAll(p, [
    'php-1-1', 'php-1-2', 'php-1-3', 'php-1-q',
    'php-2-1', 'php-2-2', 'php-2-3', 'php-2-q',
    'sql-2-1', 'sql-2-2', 'sql-2-3', 'sql-2-q',
  ])},

  // ── Carriera DevOps ────────────────────────────────────────────────────────
  { id: 'devops_starter', check: p => hasAll(p, [
    'git-1-1',   'git-1-2',   'git-1-3',   'git-1-q',
    'linux-1-1', 'linux-1-2', 'linux-1-3', 'linux-1-q',
  ])},
  { id: 'devops_engineer', check: p => hasAll(p, [
    'git-1-1',   'git-1-2',   'git-1-3',   'git-1-q',
    'git-2-1',   'git-2-2',   'git-2-3',   'git-2-q',
    'git-3-1',   'git-3-2',   'git-3-3',   'git-3-q',
    'linux-1-1', 'linux-1-2', 'linux-1-3', 'linux-1-q',
    'linux-2-1', 'linux-2-2', 'linux-2-3', 'linux-2-q',
    'linux-3-1', 'linux-3-2', 'linux-3-3', 'linux-3-q',
    'cicd-1-1',  'cicd-1-2',  'cicd-1-3',  'cicd-1-q',
    'cicd-2-1',  'cicd-2-2',  'cicd-2-3',  'cicd-2-q',
    'cicd-3-1',  'cicd-3-2',  'cicd-3-3',  'cicd-3-q',
  ])},

  // ── Full Stack & Data ──────────────────────────────────────────────────────
  { id: 'full_stack_js', check: p => hasAll(p, [
    'vue-1-1', 'vue-1-2', 'vue-1-3', 'vue-1-4', 'vue-1-q',
    'vue-2-1', 'vue-2-2', 'vue-2-3', 'vue-2-4', 'vue-2-q',
    'nuxt-3-1', 'nuxt-3-2', 'nuxt-3-3', 'nuxt-3-4', 'nuxt-3-q',
    'nodejs-1-1', 'nodejs-1-2', 'nodejs-1-3', 'nodejs-1-q',
    'nodejs-2-1', 'nodejs-2-2', 'nodejs-2-3', 'nodejs-2-4', 'nodejs-2-q',
    'express-1-1', 'express-1-2', 'express-1-3', 'express-1-q',
    'express-2-1', 'express-2-2', 'express-2-3', 'express-2-q',
  ])},
  { id: 'sql_master', check: p => hasAll(p, [
    'sql-1-1', 'sql-1-2', 'sql-1-3', 'sql-1-q',
    'sql-2-1', 'sql-2-2', 'sql-2-3', 'sql-2-q',
    'sql-3-1', 'sql-3-2', 'sql-3-3', 'sql-3-q',
  ])},
  { id: 'data_engineer', check: p => hasAll(p, [
    'sql-1-1', 'sql-1-2', 'sql-1-3', 'sql-1-q',
    'sql-2-1', 'sql-2-2', 'sql-2-3', 'sql-2-q',
    'sql-3-1', 'sql-3-2', 'sql-3-3', 'sql-3-q',
    'redis-1-1', 'redis-1-2', 'redis-1-3', 'redis-1-q',
    'redis-2-1', 'redis-2-2', 'redis-2-3', 'redis-2-q',
  ])},
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
