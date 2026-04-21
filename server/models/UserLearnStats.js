'use strict'
const { Model } = require('sutando')

class UserLearnStats extends Model {
  static table      = 'user_learn_stats'
  static timestamps = true

  user() {
    return this.belongsTo(require('./User'), 'user_id')
  }
}

module.exports = UserLearnStats
