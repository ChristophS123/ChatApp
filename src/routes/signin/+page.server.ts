import * as db from '$lib/server/database';
import { supabase } from '$lib/supabaseClient';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
	signin: async ({ request }) => {
			const data = await request.formData();
			let response = await db.signIn(data);
			if(response == null) {
				return fail(303, {error:true})
			} else {
				throw redirect(303, "/");
			}
			
	}
};