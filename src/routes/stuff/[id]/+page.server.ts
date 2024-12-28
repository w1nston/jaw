import { getSpecificStuff } from '../../../features/stuff/getSpecificStuff.server';
import type { PageServerLoad } from './$types';

export let load: PageServerLoad = async ({ params }) => {
  if (!params.id || params.id === '') {
    throw new Error("Can't get stuff without an id...");
  }

  return {
    stuffs: await getSpecificStuff(params.id)
  };
};
