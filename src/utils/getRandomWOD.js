import { wordList } from '../words/wordList.js';

async function getRandomWOD() {
  const wordListIndex = Math.floor(Math.random() * 1491) + 1;
  return wordList[wordListIndex];
}

export default getRandomWOD;
