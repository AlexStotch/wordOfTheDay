// RUN:  node app.js
import dotenv from 'dotenv'
dotenv.config()
import pkg from '@slack/bolt';
const { App } = pkg;

import { formatMessage } from './formatMessage.js';
import { getWordOfTheDay } from './getWordOfTheDay.js';
import { getGif } from "./getGif.js";

const app = new App({
    token: process.env.TOKEN,
    signingSecret: process.env.SIGNIN_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});


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

async function updateWOD(channelId, messageTs, word = null) {
    const wod = word || await getWordOfTheDay();
    const gif = await getGif(wod);
    await app.client.chat.update({
        token: process.env.TOKEN,
        channel: channelId,
        ts: messageTs,
        blocks: formatMessage(gif, wod)
    });
}

async function publishNewWOD(channelId, word = null) {
    const wod = word || await getWordOfTheDay();
    const gif = await getGif(wod);
    //https://www.npmjs.com/package/node-schedule
    try {
        await app.client.chat.postMessage({
            token: process.env.TOKEN,
            channel: channelId,
            blocks: formatMessage(gif, wod)
        });
    }
    catch (error) {
        console.error(error);
    }
}

(async () => {
    await app.start(process.env.PORT);
    console.log('⚡️ Bolt app is running!');

    app.event('app_mention', async ({ event}) => {
        try {
            const input = event.text;
            const endUserId = input.indexOf('>');
            const userWord = input.slice(endUserId + 1);
            if (userWord.length > 3) {
                return await publishNewWOD(event.channel, userWord);
            }
            await publishNewWOD(event.channel);
        }
        catch (error) {
            console.error(error);
        }
    });

    app.action('delete', async (event) => {
        try {
            const container = event.body.container;
            await deleteMessage(container.channel_id, container.message_ts);
        } catch (error) {
            console.error(error);
        }
    });

    app.action('switch_word', async (event) => {
        try {
            const container = event.body.container;
            await updateWOD(container.channel_id, container.message_ts);
        } catch (error) {
            console.error(error);
        }
    });

    app.action('switch_gif', async (event) => {
        let word = null;
        const message = event.body.message;
        const container = event.body.container;
        message.blocks.forEach(block => {
            if (block.hasOwnProperty('text')) {
                word = block.text.text;
            }
        })
        try {
            await updateWOD(container.channel_id, container.message_ts, word);
        } catch (error) {
            console.error(error);
        }
    });
    // process.exit(1)
})();


