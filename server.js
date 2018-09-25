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

app.post('/api/v1/users/new', (request, response) => {
  const user = request.body;
  for (let requiredParameter of ['username', 'password', 'first_name', 'last_name']) {
    if (!user[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }

  database('users').insert(user, 'id')
    .then(user => {
      response.status(201).json({ id: user[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/users', async (request, response) => {
  const guest = request.body;
  try {
    const users = await database('users').select()
    console.log('trying')
    const validation = users.find(user => {
      return (user.username === guest.username) && (user.password === guest.password)
    })
    response.status(201).json({ username: validation.username, id: validation.id, first_name: validation.first_name, last_name: validation.last_name })
  } catch (error) {
    console.log(error)
    response.status(500).json({ 'Incorrect username or password': error })
  }
});

app.get('/', (request, response) => {
});

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then((user) => {
      response.status(200).json(user);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});
