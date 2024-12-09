const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

const teachings = {};

app.get('/teach', (req, res) => {
  const { ask, ans } = req.query;
  if (!ask || !ans) return res.status(400).send('Invalid input.');

  const answers = teachings[ask] || [];
  teachings[ask] = [...answers, ans];
  res.send('Question and answer added successfully.');
});

app.get('/chat', (req, res) => {
  const { ask } = req.query;
  if (!ask) return res.status(400).send('Invalid input.');

  if (teachings[ask]) {
    const randomAnswer = teachings[ask][Math.floor(Math.random() * teachings[ask].length)];
    return res.send(randomAnswer);
  }

  axios
    .get(`https://www.x-noobs-api.000.pe/sim?ask=${encodeURIComponent(ask)}`)
    .then(response => res.send(response.data))
    .catch(() => res.status(500).send('Error chatting with the AI.'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
