const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || '';

export function formatMessage(gif, word) {
    return [
        {
            type: 'divider',
            block_id: 'divider1'
        },
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: capitalize(word)
            },
        },
        {
            type: 'image',
            image_url: gif,
            alt_text: 'Yay! The modal was updated'
        },
        {
            type: 'divider',
            block_id: 'divider2'
        },
        {
            type: 'actions',
            elements: [
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        text: 'Switch Word',
                        emoji: true
                    },
                    value: 'click_me_123',
                    action_id: "switch_word"
                }
            ]
        },
        {
            type: 'actions',
            elements: [
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        text: 'Switch Gif',
                        emoji: true
                    },
                    value: "click_me_1234",
                    action_id: "switch_gif"
                }
            ]
        },
    ]
}