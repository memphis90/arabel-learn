const { Migration } = require('sutando')

module.exports = class extends Migration {
  async up(schema) {
    await schema.table('users', (table) => {
      table.unsignedInteger('role_id').notNullable().defaultTo(1).after('plan_id')
      table.foreign('role_id').references('roles.id')
    })
  }

  async down(schema) {
    await schema.table('users', (table) => {
      table.dropForeign(['role_id'])
      table.dropColumn('role_id')
    })
  }
}
