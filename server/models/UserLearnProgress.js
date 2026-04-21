'use strict'
const { Model } = require('sutando')

class UserLearnProgress extends Model {
  static table      = 'user_learn_progress'
  static timestamps = false

  user() {
    return this.belongsTo(require('./User'), 'user_id')
  }
}

module.exports = UserLearnProgress
