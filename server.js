const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());

// Endpoint for teaching
app.get('/teach', async (req, res) => {
  try {
    const { ask, ans } = req.query;

    if (!ask || !ans) {
      return res.status(400).json({ error: 'Both ask and ans parameters are required' });
    }

    const response = await axios.get(`https://www.x-noobs-api.000.pe/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
    res.json(response.data);

  } catch (error) {
    console.error('Error in teaching API:', error);
    res.status(500).json({ error: 'Error in teaching API' });
  }
});

// Endpoint for chatting
app.get('/chat', async (req, res) => {
  try {
    const { ask } = req.query;

    if (!ask) {
      return res.status(400).json({ error: 'Ask parameter is required' });
    }

    const response = await axios.get(`https://www.x-noobs-api.000.pe/sim?ask=${encodeURIComponent(ask)}`);
    res.json(response.data);

  } catch (error) {
    console.error('Error in chatting API:', error);
    res.status(500).json({ error: 'Error in chatting API' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port} Made With ⚡ By NZR`);
});

