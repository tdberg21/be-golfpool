
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'tdberg21', password: 'password', first_name: 'Tory', last_name: 'Dannenberg', masters: '1st', usopen: '2nd', british: '1st', pga_champ: '4th'},
        {id: 2, username: 'mdberg', password: 'password', first_name: 'Maddy', last_name: 'Dannenberg', masters: '3rd', usopen: 'Last', british: '3rd', pga_champ: '2nd'},
        {id: 3, username: 'cdberg', password: 'password', first_name: 'Christy', last_name: 'Dannenberg', masters: 'Last', usopen: '1st', british: '2nd', pga_champ: '3rd'},
        {id: 4, username: 'cdberg', password: 'password', first_name: 'Kevin', last_name: 'Williamson', masters: '2nd', usopen: '3rd', british: 'Last', pga_champ: '1st'},
        {id: 5, username: 'arejaymiller', password: 'password', first_name: 'RJ', last_name: 'Miller', masters: 'n/a', usopen: 'n/a', british: '4th', pga_champ: 'last'},
      ]);
    });
};
