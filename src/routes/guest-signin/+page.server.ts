import * as db from '$lib/server/database';
import { redirect } from '@sveltejs/kit';

export const actions = {
	signup: async ({ request }) => {
                const data = await request.formData();
                await db.guestSignIn(data.get('name'));
                throw redirect(303, "/chat/d1591013-d52b-4d2d-8411-b62b1a7eb2ba");
	}
};