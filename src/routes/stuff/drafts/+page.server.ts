import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export let load: PageServerLoad = async ({ params }) => {
    return redirect(301, '/stuff');
}