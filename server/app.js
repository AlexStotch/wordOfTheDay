// RUN:  node app.js
import dotenv from 'dotenv';
import pkg from '@slack/bolt';

import deleteMessage from './actions/deleteWOD.js';
import updateWOD from './actions/updateWOD.js';
import getWODFromEvent from './utils/getWODFromEvent.js';
import getWordFromAppTag from './utils/getWordFromAppTag.js';
import postEphemeral from './actions/postEphemeral.js';
import postMessage from './actions/postMessage.js';

dotenv.config();
const { App } = pkg;

const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNIN_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

(async () => {
  await app.start(process.env.PORT);
  console.log(`start on port${process.env.PORT}`);

  app.command('/wordoftheday', async ({ body, ack }) => {
    try {
      // Acknowledge command request
      await ack();
      const word = body.text;
      await postEphemeral(app, body.channel_id, body.user_id, word);
    } catch (error) {
      console.error(error);
    }
  });

  app.event('app_mention', async ({ event }) => {
    try {
      const userWord = getWordFromAppTag(event);
      await postEphemeral(app, event.channel_id, event.user_id, userWord);
    } catch (error) {
      console.error(error);
    }
  });

  app.action('delete', async (event) => {
    try {
      const responseUrl = event.body.response_url;
      await deleteMessage(responseUrl);
    } catch (error) {
      console.error(error);
    }
  });

  app.action('send', async ({ body }) => {
    try {
      const responseUrl = body.response_url;
      const channelId = body.container.channel_id;
      const { gif, word } = JSON.parse(body.actions[0].value);
      await deleteMessage(responseUrl);
      await postMessage(app, channelId, gif, word);
    } catch (error) {
      console.error(error);
    }
  });

  app.action('switch_word', async (event) => {
    try {
      const { container } = event.body;
      await updateWOD(app, container.channel_id, container.message_ts);
    } catch (error) {
      console.error(error);
    }
  });

  app.action('switch_gif', async (event) => {
    try {
      const word = getWODFromEvent(event);
      const { container } = event.body;
      await updateWOD(app, container.channel_id, container.message_ts, word);
    } catch (error) {
      console.error(error);
    }
  });
  // process.exit(1)
})();
