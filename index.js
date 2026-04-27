const express = require('express');
const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { messages, system } = req.body;
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.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}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1000,
      messages: [
        { role: 'system', content: system },
        ...messages
      ]
    })
  });
  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || 'Maaf, cuba lagi!';
  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Running on port ' + PORT));
