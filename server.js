const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Endpoint for teaching
app.post('/teach', async (req, res) => {
  try {
    const { ask, ans } = req.body; // Change to req.body for POST requests

    if (!ask || !ans) {
      return res.status(400).json({ error: 'Both ask and ans fields are required' });
    }

    const response = await axios.get(`https://www.x-noobs-api.000.pe/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
    res.json(response.data);

  } catch (error) {
    console.error('Error in teaching API:', error);
    res.status(500).json({ error: 'Internal server error while processing the teach request' });
  }
});

// Endpoint for chatting
app.post('/chat', async (req, res) => {
  try {
    const { ask } = req.body; // Change to req.body for POST requests

    if (!ask) {
      return res.status(400).json({ error: 'Ask field is required' });
    }

    const response = await axios.get(`https://www.x-noobs-api.000.pe/sim?ask=${encodeURIComponent(ask)}`);
    res.json(response.data);

  } catch (error) {
    console.error('Error in chatting API:', error);
    res.status(500).json({ error: 'Internal server error while processing the chat request' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}. Made With ⚡ By NZR`);
});
