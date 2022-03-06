// RUN:  node app.js
import dotenv from 'dotenv';
import pkg from '@slack/bolt';

import deleteMessage from './actions/deleteWOD.js';
import updateWOD from './actions/updateWOD.js';
import getWordFromAppTag from './utils/getWordFromAppTag.js';
import postEphemeral from './actions/postEphemeral.js';
import postMessage from './actions/postMessage.js';
import getRandomExpression from './utils/getRandomExpression.js';
import getRandomHumanBodyWord from './utils/getRandomHumanBodyWord.js';
import getRandomFoodWord from './utils/getRandomFoodWord.js';
import getRandomHouseWord from './utils/getRandomHouseWord.js';
import getRandomWildAnimalWord from './utils/getRandomWildAnimalWord.js';

dotenv.config();
const { App } = pkg;

const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNIN_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

const CATEGORIES = {
  human_body: getRandomHumanBodyWord,
  food: getRandomFoodWord,
  expressions: getRandomExpression,
  house: getRandomHouseWord,
  wild_animals: getRandomWildAnimalWord,
};

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
      await postEphemeral(app, event.channel, event.user, userWord);
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
      const responseUrl = event.body.response_url;
      await updateWOD(responseUrl);
    } catch (error) {
      console.error(error);
    }
  });

  app.action('category', async (event) => {
    try {
      const { payload } = event;

      const word = await CATEGORIES[payload.selected_option.value]();
      const responseUrl = event.body.response_url;
      await updateWOD(responseUrl, word);
    } catch (error) {
      console.error(error);
    }
  });

  app.action('switch_gif', async ({ body }) => {
    try {
      const word = body.actions[0].value;
      const responseUrl = body.response_url;
      await updateWOD(responseUrl, word);
    } catch (error) {
      console.error(error);
    }
  });
  // process.exit(1)
})();
