'use strict'
const { Model } = require('sutando')

class User extends Model {
  static table = 'users'

  role() {
    return this.belongsTo(require('./Role'), 'role_id')
  }

  learnStats() {
    return this.hasOne(require('./UserLearnStats'), 'user_id')
  }

  learnProgress() {
    return this.hasMany(require('./UserLearnProgress'), 'user_id')
  }
}

module.exports = User
