import * as db from '$lib/server/database';

export function load({ params }) {
    let slug = params.slug;
    return {
        chatID: slug
    };
}