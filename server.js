const express = require('express');
const app = express();
var cors = require('cors')
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Dberg Golf Pool';
app.set('port', process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

io.on('connection', (socket) => {
  console.log('Someone has connected');

  socket.emit('message', `A new user, ${Date.now()}, has connected`);

  socket.on('message', (message) => {
    console.log(`The new user's name is ${message.username}, and his/her message is: ${message.text}`);
  })

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });

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
  response.send('this is a response from the server at 3001')
});

app.get('/api/v1/golfers', (request, response) => {
  database('golfers').select()
    .then( golfers => {
      response.status(200).json(golfers);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
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

http.listen(app.get('port'), () => {
  console.log("sockets bitch!")
})
