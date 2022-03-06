import expressionList from '../words/expressionList.js';

async function getRandomExpression() {
  const wordListIndex = Math.floor(Math.random() * 33) + 1;
  return expressionList[wordListIndex];
}

export default getRandomExpression;
