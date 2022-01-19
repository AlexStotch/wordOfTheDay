import express from 'express';

const app = express();
const PORT = 9000;

app.get('/word', async (request, response) => {
  // const word = await getRandomWOD();
  const word = 'truc';
  response.header('Access-Control-Allow-Origin', '*');
  response.send({ word });
});

app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
