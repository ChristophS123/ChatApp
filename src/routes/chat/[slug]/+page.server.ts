import * as db from '$lib/server/database';

export function load({ params }) {
    console.log(params.slug);
    let slug = params.slug;
    let chat = db.getChatByID(slug);
    let messages = db.getMessagesByChat(chat.id);
    return {
        chat: chat,
        messages: messages
    };
}