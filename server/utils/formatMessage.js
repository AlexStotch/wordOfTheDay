const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';

function formatMessage(gif, word, isEphemeral = true) {
  const messageValue = JSON.stringify({
    gif,
    word,
  });
  const message = [
    {
      type: 'divider',
      block_id: 'divider1',
    },
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: capitalize(word),
      },
    },
    {
      type: 'image',
      image_url: gif,
      alt_text: 'Yay! The modal was updated',
    },
  ];

  if (isEphemeral) {
    message.push(
      {
        type: 'divider',
        block_id: 'divider2',
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'New Word',
              emoji: true,
            },
            action_id: 'switch_word',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'New Gif',
              emoji: true,
            },
            value: word,
            action_id: 'switch_gif',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Expressions',
              emoji: true,
            },
            value: word,
            action_id: 'expressions',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Cancel',
              emoji: true,
            },
            style: 'danger',
            action_id: 'delete',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Send',
              emoji: true,
            },
            style: 'primary',
            value: messageValue,
            action_id: 'send',
          },
        ],
      },
    );
  }

  return message;
}

export default formatMessage;
