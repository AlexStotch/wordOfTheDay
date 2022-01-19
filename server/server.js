import express from 'express';
import dotenv from 'dotenv';
import getGif from './actions/getGif.js';
import getRandomWOD from './utils/getRandomWOD.js';

dotenv.config();

const app = express();
const PORT = 9000;

app.get('/word', async (request, response) => {
  const word = await getRandomWOD();
  const gif = await getGif(word);
  response.header('Access-Control-Allow-Origin', '*');
  response.send({ word, gif });
});

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
