import axios from 'axios';

async function deleteMessage(responseUrl) {
  try {
    await axios.post(responseUrl, {
      response_type: 'ephemeral',
      text: '',
      replace_original: true,
      delete_original: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export default deleteMessage;
