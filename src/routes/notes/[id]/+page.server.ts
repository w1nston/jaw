import { getNote } from '../../../features/notes/getNote.server';
import type { PageServerLoad } from './$types';

export let load: PageServerLoad = async ({ params }) => {
  if (!params.id || params.id === '') {
    throw new Error("Can't get a thought without an id...");
  }

  return {
    note: await getNote(params.id)
  };
};
