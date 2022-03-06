import foodWordList from '../words/foodWords.js';

async function getRandomFoodWord() {
  const wordListIndex = Math.floor(Math.random() * 85) + 1;
  return foodWordList[wordListIndex];
}

export default getRandomFoodWord;
