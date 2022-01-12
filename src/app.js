// RUN:  node app.js
import dotenv from 'dotenv'
dotenv.config()
import pkg from '@slack/bolt';
const { App } = pkg;

import {postNewWOD} from "./actions/postWOD.js";
import {deleteMessage} from "./actions/deleteWOD.js";
import {updateWOD} from "./actions/updateWOD.js";
import {getWODFromEvent} from "./utils/getWODFromEvent.js";

const app = new App({
    token: process.env.TOKEN,
    signingSecret: process.env.SIGNIN_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

(async () => {
    await app.start(process.env.PORT);

    app.event('app_mention', async ({ event}) => {
        try {
            const input = event.text;
            const endUserId = input.indexOf('>');
            const userWord = input.slice(endUserId + 1);
            if (userWord.length > 3) {
                return await postNewWOD(app, event.channel, userWord);
            }
            await postNewWOD(app, event.channel);
        }
        catch (error) {
            console.error(error);
        }
    });

    app.action('delete', async (event) => {
        try {
            const container = event.body.container;
            await deleteMessage(app, container.channel_id, container.message_ts);
        } catch (error) {
            console.error(error);
        }
    });

    app.action('switch_word', async (event) => {
        try {
            const container = event.body.container;
            await updateWOD(app, container.channel_id, container.message_ts);
        } catch (error) {
            console.error(error);
        }
    });

    app.action('switch_gif', async (event) => {
        try {
            const word = getWODFromEvent(event);
            const container = event.body.container;
            await updateWOD(app, container.channel_id, container.message_ts, word);
        } catch (error) {
            console.error(error);
        }
    });
    // process.exit(1)
})();


