import * as db from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export async function load() {
    let userID:string = ""
    let invitations = await db.loadInvitationFromUser();
    return {
        invitations
    };
}

export const actions = {
	accept: async ({ request }) => {
        const data = await request.formData();
        console.log(data)
        await db.acceptInvitation(data.get("invID"));
        redirect(303, "/");
	},
    deny: async ({ request }) => {
        const data = await request.formData();
        console.log(data)
        await db.denyInvitation(data.get("invID"));
        redirect(303, "/");
    }

};