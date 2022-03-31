import wordList from '../words/allWordsList.js';

async function getRandomWOD() {
  const wordListIndex = Math.floor(Math.random() * wordList.length) + 1;
  return wordList[wordListIndex];
}

export default getRandomWOD;
