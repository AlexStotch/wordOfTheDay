import houseWords from '../words/houseWords.js';

async function getRandomHouseWord() {
  const wordListIndex = Math.floor(Math.random() * 26) + 1;
  return houseWords[wordListIndex];
}

export default getRandomHouseWord;
