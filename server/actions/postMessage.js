import formatMessage from '../utils/formatMessage.js';

async function postNewWOD(app, channelId, gif, word) {
  // https://www.npmjs.com/package/node-schedule
  try {
    await app.client.chat.postMessage({
      token: 'xoxb-4285058675-2692956156304-MO0Fcr61PZTovjBQKcvYEDrf',
      channel: channelId,
      blocks: formatMessage(gif, word, false),
    });
  } catch (error) {
    console.error(error);
  }
}

export default postNewWOD;
