import * as db from '$lib/server/database';
import { fail, redirect } from '@sveltejs/kit';

let chatID = "";

export function load({ params }) {
    let slug = params.slug;
    chatID = slug;
    return {
        chatID: slug
    };
}

export const actions = {
	send: async ({ request }) => {
        const data = await request.formData();
        try {
            await db.sendInvitation(data.get("email"), chatID);
        } catch(e) {
            return fail(303, {error:true})
        }
	},
    leave: async () => {
        await db.leaveChat(chatID);
        throw redirect(303, '/');
    }
};