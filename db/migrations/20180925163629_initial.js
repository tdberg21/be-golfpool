
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username');
      table.string('password');
      table.string('first_name');
      table.string('last_name');
      table.string('masters');
      table.string('usopen');
      table.string('british');
      table.string('pga_champ');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('golfers', function (table) {
      table.increments('id').primary();
      table.string('api_id');
      table.string('first_name');
      table.string('last_name');
      table.string('country');
      table.string('tournament');
      table.string('tournament_id');
      table.integer('year');
      table.integer('user_id').unsigned()
      table.foreign('user_id')
        .references('users.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('golfer'),
    knex.schema.dropTable('users')
  ]);
};
