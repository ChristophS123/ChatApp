import * as db from '$lib/server/database';

export async function load() {
    let userID:string = ""
    let invitations = await db.loadInvitationFromUser();
    return {
        invitations
    };
}