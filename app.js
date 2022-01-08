// RUN:  node app.js
require('dotenv').config();
const axios = require('axios');
const { App } = require("@slack/bolt");
const wordList = require('./wordList.js').wordList;

const app = new App({
    token: process.env.TOKEN,
    signingSecret: process.env.SIGNIN_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || "";

async function getWordOfTheDay() {
    // const now = new Date();
    // const start = new Date(now.getFullYear(), 0, 0);
    // const diff = now - start;
    // const oneDay = 1000 * 60 * 60 * 24;
    // const day = Math.floor(diff / oneDay);
    const wordListIndex = Math.floor(Math.random() * 1491) + 1;
    return wordList[wordListIndex];
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

function formatMessage(gif, word) {
    return [
        {
            type: 'section',
            text: {
                type: 'plain_text',
                text: capitalize(word)
            },
            accessory: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "switch word",
                    emoji: true
                },
                value: "click_me_123",
                action_id: "switch_word"
            }
        },
        {
            type: 'image',
            image_url: gif,
            alt_text: 'Yay! The modal was updated'
        },
    ]
}

async function deleteMessage(channelId, messageId) {
    try {
        await app.client.chat.delete({
            channel: channelId,
            ts: messageId
        });
    }
    catch (error) {
        console.error(error);
    }
}

async function sendWordOfTheDay(say) {
    const word = await getWordOfTheDay();
    const gif = await getGif(word);
    await say({"blocks": formatMessage(gif, word)});
}

async function publishNewWOD(channelId) {
    const word = await getWordOfTheDay();
    const gif = await getGif(word);
    //https://www.npmjs.com/package/node-schedule
    try {
        await app.client.chat.postMessage({
            token: process.env.TOKEN,
            channel: channelId,
            blocks: formatMessage(gif, word)
        });
    }
    catch (error) {
        console.error(error);
    }
}

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');

    app.event('app_mention', async ({ event, context, client, say}) => {
        try {
            await sendWordOfTheDay(say);
        }
        catch (error) {
            console.error(error);
        }
    });

    app.action('switch_word', async (event) => {
        try {
            const container = event.body.container;
            await deleteMessage(container.channel_id, container.message_ts);
            await publishNewWOD(container.channel_id);
        } catch (error) {
            console.error(error);
        }
    });
    // process.exit(1)
})();


