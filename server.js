const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

// Teaching endpoint, returns only the external API's response text
app.get('/teach', async (req, res) => {
  try {
    const { ask, ans } = req.query;
    const apiUrl = `https://www.x-noobs-api.000.pe/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`;
    
    const response = await axios.get(apiUrl);
    res.send(response.data); // Sends only the raw text response
  } catch (error) {
    res.status(500).send('Error teaching the AI'); // Sends minimal error text
  }
});

// Chatting endpoint, returns only the external API's response text
app.get('/chat', async (req, res) => {
  try {
    const { ask } = req.query;
    const apiUrl = `https://www.x-noobs-api.000.pe/sim?ask=${encodeURIComponent(ask)}`;
    
    const response = await axios.get(apiUrl);
    res.send(response.data); // Sends only the raw text response
  } catch (error) {
    res.status(500).send('Error chatting with the AI'); // Sends minimal error text
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
