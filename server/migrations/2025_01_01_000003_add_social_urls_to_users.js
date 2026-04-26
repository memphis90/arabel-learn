const { Migration } = require('sutando')

module.exports = class extends Migration {
  async up(schema) {
    await schema.table('users', (table) => {
      table.string('linkedin_url', 150).nullable().after('role_id')
      table.string('github_url',   150).nullable().after('linkedin_url')
    })
  }

  async down(schema) {
    await schema.table('users', (table) => {
      table.dropColumn('linkedin_url')
      table.dropColumn('github_url')
    })
  }
}
