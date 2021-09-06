const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const post = {};

app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {
  console.log(`${Date.now()} - Get Request Received`)
  res.send(post);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  post[id] = {
    id,
    title,
  };

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });
  console.log(`Post Created: { ${id}, ${title} }}`);
  res.status(201).send(post[id]);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log(`Receiving Event: ${type}`);
  res.send({ status: 'Received Event' });
});

app.listen('4000', () => {
  console.log('Listening on 4000');
});
