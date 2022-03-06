import wildAnimalWords from '../words/wildAnimalWords.js';

async function getRandomWildAnimalWord() {
  const wordListIndex = Math.floor(Math.random() * 38) + 1;
  return wildAnimalWords[wordListIndex];
}

export default getRandomWildAnimalWord;
