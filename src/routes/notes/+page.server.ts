import { getNotes } from '../../features/notes/getNotes.server';
import type { PageServerLoad } from './$types';

export let load: PageServerLoad = async ({ params }) => {
  return {
    notes: await getNotes()
  };
};
