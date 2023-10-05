import * as db from '$lib/server/database';

export const actions = {
	signup: async ({ request }) => {
		const data = await request.formData();
		return await db.signUp(data.get('email'), data.get('password'), data.get("name"));
	}
};