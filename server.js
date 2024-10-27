const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/teach', async (req, res) => {
    const { ask, ans } = req.body;
    if (!ask || !ans) return res.status(400).json({ error: "Please provide both 'ask' and 'ans' fields." });

    try {
        const response = await axios.get(`https://www.x-noobs-api.000.pe/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
        res.json({ message: "Teach action successful", data: response.data });
    } catch (error) {
        res.status(500).json({ error: "Failed to teach the AI" });
    }
});

app.get('/chat', async (req, res) => {
    const { ask } = req.query;
    if (!ask) return res.status(400).json({ error: "Please provide an 'ask' field in the query." });

    try {
        const response = await axios.get(`https://www.x-noobs-api.000.pe/sim?ask=${encodeURIComponent(ask)}`);
        res.json({ message: "Chat response successful", answer: response.data });
    } catch (error) {
        res.status(500).json({ error: "Failed to get a response from the AI" });
    }
});

app.listen(port, () => {
    console.log(`AI Chatbot server is running on http://localhost:${port}`);
});
