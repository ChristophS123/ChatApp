import * as db from '$lib/server/database';

let chatID:string = "";

export async function load({ params }) {
    console.log(params.slug);
    let slug = params.slug;
    chatID = slug
    let chat = await db.getChatByID(slug);
    let messages = await db.getMessagesByChat(chat.id);
    let username = await db.getUsername();
    return {
        chat: chat,
        messages: messages,
        username: username
    };
}

export const actions = {
	send: async ({ request }) => {
        const data = await request.formData();
        await db.sendMessage(chatID, data.get("message"));
	}
};
    