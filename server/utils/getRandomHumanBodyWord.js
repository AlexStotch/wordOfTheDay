import humanBodyWordList from '../words/humanBodyWords.js';

async function getRandomExpression() {
  const wordListIndex = Math.floor(Math.random() * 72) + 1;
  return humanBodyWordList[wordListIndex];
}

export default getRandomExpression;
