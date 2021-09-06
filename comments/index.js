const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const commentsByPostId = {};

app.use(express.json());
app.use(cors());

app.get('/hi', (req, res) => {
  console.log(`${Date.now} - Get Request Received: Hi`)
  res.send('its working');
})

app.get('/posts/comments/all', (req, res) => {
  console.log(`${Date.now} - Get Request Received: All`)
  res.send(commentsByPostId);
});

// app.get('/posts/:id/comments', (req, res) => {
//   res.send(commentsByPostId[req.params.id] || []);
// });

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: 'pending' });

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  commentsByPostId[req.params.id] = comments;
  console.log(`Comment Received: ${content}`);
  res.status(201).send({ commentId, content });
});

app.post('/events', async (req, res) => {
  console.log(`Event Received: ${req.body.type}`);
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }
  res.send({ status: 'Received Event' });
});

app.listen('4001', () => {
  console.log('Listening on 4001');
});
