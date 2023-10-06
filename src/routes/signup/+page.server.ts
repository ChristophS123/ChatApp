import * as db from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export const actions = {
	signup: async ({ request }) => {
		const data = await request.formData();
		try {
			await db.signUp(data.get('email'), data.get('password'), data.get("name"));
			return fail(303, {signup:true})
		} catch(e) {
			return fail(303, {error:true})
		}
	}
};