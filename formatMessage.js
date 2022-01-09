const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || "";

export function formatMessage(gif, word) {
    return [
        {
            type: 'section',
            text: {
                type: 'plain_text',
                text: capitalize(word)
            },
            accessory: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "switch word",
                    emoji: true
                },
                value: "click_me_123",
                action_id: "switch_word"
            }
        },
        {
            type: 'image',
            image_url: gif,
            alt_text: 'Yay! The modal was updated'
        },
    ]
}