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
              text: 'Switch Word',
              emoji: true,
            },
            value: 'click_me_123',
            action_id: 'switch_word',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Switch Gif',
              emoji: true,
            },
            value: word,
            action_id: 'switch_gif',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Cancel',
              emoji: true,
            },
            value: 'click_me_12345',
            action_id: 'delete',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Send',
              emoji: true,
            },
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
