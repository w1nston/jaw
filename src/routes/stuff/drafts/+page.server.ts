import { getStuffDrafts } from '../../../features/stuff/getStuffDrafts.server';
import type { PageServerLoad } from './$types';

export let load: PageServerLoad = async ({ params }) => {
    return {
        drafts: await getStuffDrafts()
    }
}