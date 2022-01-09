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

async function publishNewWOD(channelId, previousWord = null) {
    const word = previousWord || await getWordOfTheDay();
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

    app.event('app_mention', async ({ event}) => {
        try {
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
            await deleteMessage(container.channel_id, container.message_ts);
            await publishNewWOD(container.channel_id);
        } catch (error) {
            console.error(error);
        }
    });

    app.action('switch_gif', async (event) => {
        let word = null;
        event.body.message.blocks.forEach(block => {
            if (block.hasOwnProperty('text')) {
                word = block.text.text;
            }
        })
        try {
            const container = event.body.container;
            await deleteMessage(container.channel_id, container.message_ts);
            await publishNewWOD(container.channel_id, word);
        } catch (error) {
            console.error(error);
        }
    });
    // process.exit(1)
})();


