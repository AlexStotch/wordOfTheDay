async function deleteMessage(app, channelId, messageId) {
  try {
    await app.client.chat.delete({
      channel: channelId,
      ts: messageId,
    });
  } catch (error) {
    console.error(error);
  }
}

export default deleteMessage;
