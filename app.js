// RUN:  node app.js
require('dotenv').config();
const axios = require('axios');
const { App } = require("@slack/bolt");
const wordList = require('./wordList.js').wordList;

const app = new App({
    token: process.env.TOKEN,
    signingSecret: process.env.SIGNIN_SECRET
});

async function sendWordOfTheDay() {
    const word = await getWordOfTheDay();
    const gif = await getGif(word);
    // C02EBT77QH1 community private id
    // CB3G48RNJ fakenews channel test id
    await publishMessage('CB3G48RNJ', gif, word)
}

async function getWordOfTheDay() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    // const wordListIndex = Math.floor(Math.random() * 1491) + 1;
    return wordList[day];
}

async function getGif(wordOfTheDay) {
    const baseUrl = 'http://api.giphy.com/v1/gifs/search?';
    const wodQuery = `q=${wordOfTheDay}`;
    const apiKey = `&api_key=${process.env.GIPHY_API_KEY}`;
    const params = '&limit=1&rating=pg';

    const query = baseUrl + wodQuery + apiKey + params;

    return axios.get(query)
        .then(response => {
            return response.data.data[0].images.downsized.url;
        })
        .catch((error) => {
            console.log(error);
        });
}

const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || "";

async function publishMessage(id, gif, word) {
    //https://www.npmjs.com/package/node-schedule
    try {
        await app.client.chat.postMessage({
            token: process.env.TOKEN,
            channel: id,
            blocks: [
                {
                    type: 'header',
                    text: {
                        type: 'plain_text',
                        text: capitalize(word)
                    }
                },
                {
                    type: 'image',
                    image_url: gif,
                    alt_text: 'Yay! The modal was updated'
                }
            ]
        });
    }
    catch (error) {
        console.error(error);
    }
}

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
    await sendWordOfTheDay();
    process.exit(1)
})();


