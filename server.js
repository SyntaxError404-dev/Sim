const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/teach', async (req, res) => {
  const { ask, ans } = req.body;
  const teachUrl = `https://www.x-noobs-api.000.pe/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`;

  try {
    const response = await axios.get(teachUrl);
    res.send(response.data);
  } catch (error) {
    console.error('Error with teach API:', error.message);
    res.status(500).send('Error connecting to teach API');
  }
});

app.post('/chat', async (req, res) => {
  const { ask } = req.body;
  const chatUrl = `https://www.x-noobs-api.000.pe/sim?ask=${encodeURIComponent(ask)}`;

  try {
    const response = await axios.get(chatUrl);
    res.send(response.data);
  } catch (error) {
    console.error('Error with chat API:', error.message);
    res.status(500).send('Error connecting to chat API');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
