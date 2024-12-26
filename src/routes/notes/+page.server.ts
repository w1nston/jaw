import { getNotes } from '../../features/notes/getNotes.server';
import type { PageServerLoad } from './$types';

export let load: PageServerLoad = async ({ params }) => {
  return {
    notes: await getNotes()
  };
};


// https://scottspence.com/posts/make-an-rss-feed-with-sveltekit