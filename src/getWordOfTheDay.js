import { wordList } from './words/wordList.js'

export async function getWordOfTheDay() {
    // const now = new Date();
    // const start = new Date(now.getFullYear(), 0, 0);
    // const diff = now - start;
    // const oneDay = 1000 * 60 * 60 * 24;
    // const day = Math.floor(diff / oneDay);
    const wordListIndex = Math.floor(Math.random() * 1491) + 1;
    return wordList[wordListIndex];
}