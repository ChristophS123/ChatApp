import * as db from '$lib/server/database';

export function load() {
	console.log("test");
	return {
		chats: db.getChats("asa") ?? []
	};
}
