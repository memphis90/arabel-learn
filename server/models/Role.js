'use strict'
const { Model } = require('sutando')

class Role extends Model {
  static table = 'roles'

  users() {
    return this.hasMany(require('./User'), 'role_id')
  }
}

module.exports = Role
