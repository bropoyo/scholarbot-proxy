const express = require('express');
const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { messages, system } = req.body;
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system,
      messages
    })
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000);
