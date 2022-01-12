import {getRandomWOD} from "../utils/getRandomWOD.js";
import {getGif} from "./getGif.js";
import {formatMessage} from "../utils/formatMessage.js";

export async function updateWOD(app, channelId, messageTs, word = null) {
    const wod = word || await getRandomWOD();
    const gif = await getGif(wod);
    await app.client.chat.update({
        token: process.env.TOKEN,
        channel: channelId,
        ts: messageTs,
        blocks: formatMessage(gif, wod)
    });
}
