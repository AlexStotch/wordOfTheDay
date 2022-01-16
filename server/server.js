const express = require('express');

const app = express();
const PORT = 3001;

app.get('/word', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.send({ word: 'pate' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
