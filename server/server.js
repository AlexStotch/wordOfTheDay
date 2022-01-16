import express from 'express';
import getRandomWOD from '../slack/utils/getRandomWOD.js';

const app = express();
const PORT = 3001;

app.get('/word', async (request, response) => {
  const word = await getRandomWOD();
  response.header('Access-Control-Allow-Origin', '*');
  response.send({ word });
});

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
