import { getThoughts } from '../../features/thoughts/getThoughts.server';
import type { PageServerLoad } from './$types';

export let load: PageServerLoad = async ({ params }) => {
  return {
    thoughts: await getThoughts()
  };
};

