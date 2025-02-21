import { getStuff } from '../../features/stuff/getStuff.server';
import type { PageServerLoad } from './$types';

export let load: PageServerLoad = async ({ params }) => {
    return {
        stuff: await getStuff()
    }
}