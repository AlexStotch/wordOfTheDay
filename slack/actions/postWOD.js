import getRandomWOD from '../utils/getRandomWOD.js';
import getGif from './getGif.js';
import formatMessage from '../utils/formatMessage.js';

async function postNewWOD(app, channelId, word = null) {
  const wod = word || await getRandomWOD();
  const gif = await getGif(wod);
  // https://www.npmjs.com/package/node-schedule
  try {
    await app.client.chat.postMessage({
      token: process.env.TOKEN,
      channel: channelId,
      blocks: formatMessage(gif, wod),
    });
  } catch (error) {
    console.error(error);
  }
}

export default postNewWOD;
