import * as db from '$lib/server/database';

export function load() {
    let userID:string = ""
    let invitations = db.loadInvitationFromUser();
    return {
        invitations
    };
}