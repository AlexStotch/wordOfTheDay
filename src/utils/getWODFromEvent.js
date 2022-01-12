export function getWODFromEvent(event) {
    let word = null;
    const message = event.body.message;
    message.blocks.forEach(block => {
        if (block.hasOwnProperty('text')) {
            word = block.text.text;
        }
    });

    return word;
}