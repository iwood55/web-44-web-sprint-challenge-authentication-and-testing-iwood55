exports.seed = function(knex, Promise) {
    return knex('users')
      .truncate()
      .then(function() {
        return knex('users').insert([
          { username: 'isaac', password: 'woods'},
          { username: 'james', password: 'jones'},
          { username: 'stu', password: 'little'},
          { username: 'austin', password: 'powers'},
        ]);
      });
  };