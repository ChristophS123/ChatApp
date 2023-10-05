import * as db from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }) => {
			const data = await request.formData();
			let response = await db.createChat(data.get('name'));
      redirect(303, "/");
	}
};