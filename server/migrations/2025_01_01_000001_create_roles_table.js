const { Migration } = require('sutando')

module.exports = class extends Migration {
  async up(schema) {
    await schema.createTable('roles', (table) => {
      table.increments('id')
      table.string('name', 50).notNullable().unique()        // 'user' | 'editor' | 'admin'
      table.string('label', 100).notNullable()               // etichetta leggibile
      table.text('description').nullable()
      table.timestamps()
    })

    // Seed ruoli di default
    await this.getConnection().table('roles').insert([
      { name: 'user',   label: 'Utente',        description: 'Accesso standard alla piattaforma' },
      { name: 'editor', label: 'Editor',         description: 'Può gestire corsi e contenuti' },
      { name: 'admin',  label: 'Amministratore', description: 'Accesso completo' },
    ])
  }

  async down(schema) {
    await schema.dropTableIfExists('roles')
  }
}
