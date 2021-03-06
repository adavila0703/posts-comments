const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];

app.get('/events', (req, res) => {
  console.log(`${Date.now} - Get Request Received`)
  res.send(events);
});

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(events);

  axios.post('http://posts-clusterip-srv:4000/events', event);
  axios.post('http://comments-srv:4001/events', event);
  axios.post('http://query-srv:4002/events', event);
  axios.post('http://moderation-srv:4003/events', event);

  console.log(`Receiving and Sending: ${event}`);
  res.send({ status: 'OK' });
});

app.listen('4005', () => {
  console.log('Listening on 4005');
});
