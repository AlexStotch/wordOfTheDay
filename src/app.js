// RUN:  node app.js
import dotenv from 'dotenv';
import pkg from '@slack/bolt';

import postNewWOD from './actions/postWOD.js';
import deleteMessage from './actions/deleteWOD.js';
import updateWOD from './actions/updateWOD.js';
import getWODFromEvent from './utils/getWODFromEvent.js';
import getWODFromInput from './utils/getWODFromInput.js';

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

  app.event('app_mention', async ({ event }) => {
    try {
      const userWord = getWODFromInput(event);
      await postNewWOD(app, event.channel, userWord);
    } catch (error) {
      console.error(error);
    }
  });

  app.action('delete', async (event) => {
    try {
      const { container } = event.body;
      await deleteMessage(app, container.channel_id, container.message_ts);
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
