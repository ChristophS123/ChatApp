import * as db from '$lib/server/database';

export function load({ params }) {
    console.log(params.slug);
    let slug = params.slug;
    let chat = db.getChatByID(slug);
    return {
        chat: chat
    };
}