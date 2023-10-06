import * as db from '$lib/server/database';
import { supabase } from '$lib/supabaseClient';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load() {
	const userID = await (await supabase.auth.getSession()).data.session?.user.id;
	if(userID == null)
		throw redirect(307, '/guest-signin');
	return {
		chats: await db.getChats(userID) ?? []
	};
}
