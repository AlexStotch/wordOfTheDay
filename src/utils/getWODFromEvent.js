function getWODFromEvent(event) {
  let word = null;
  const { message } = event.body;
  message.blocks.forEach((block) => {
    // eslint-disable-next-line no-prototype-builtins
    if (block.hasOwnProperty('text')) {
      word = block.text.text;
    }
  });

  return word;
}

export default getWODFromEvent;
