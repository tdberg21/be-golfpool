const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
});

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next()
});

// app.get('/api/v1/users', (request, response) => {
//   database('users').select()
//     .then((user) => {
//       response.status(200).json(user);
//     })
//     .catch((error) => {
//       response.status(500).json({ error });
//     });
// });

app.get('/', (request, response) => {
});

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});
