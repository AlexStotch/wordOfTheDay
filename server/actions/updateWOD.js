import axios from 'axios';
import getRandomWOD from '../utils/getRandomWOD.js';
import getGif from './getGif.js';
import formatMessage from '../utils/formatMessage.js';

async function updateWOD(responseUrl, word = null) {
  const wod = word || await getRandomWOD();
  const gif = await getGif(wod);

  await axios.post(responseUrl, {
    response_type: 'ephemeral',
    blocks: formatMessage(gif, wod),
    replace_original: true,
  });
}

export default updateWOD;
