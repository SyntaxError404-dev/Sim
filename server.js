const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/teach', async (req, res) => {
  try {
    const { ask, ans } = req.query;
    if (!ask || !ans) {
      return res.status(400).send('Both ask and ans parameters are required');
    }
    const response = await axios.get(`https://www.x-noobs-api.000.pe/teach`, {
      params: { ask, ans }
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error processing your request');
  }
});

app.get('/chat', async (req, res) => {
  try {
    const { ask } = req.query;
    if (!ask) {
      return res.status(400).send('The ask parameter is required');
    }
    const response = await axios.get(`https://www.x-noobs-api.000.pe/sim`, {
      params: { ask }
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error processing your request');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
