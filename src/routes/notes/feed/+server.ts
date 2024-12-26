import { createRSSString } from '$lib/rss/rss-utils.server';
import { getNotes } from '../../../features/notes/getNotes.server';
import type { RequestHandler } from './$types';

export let prerender = true;

export let GET: RequestHandler = async ({ url }) => {
  let notesUrl = `${url.protocol}://${url.host}/notes`;

  let notes = await getNotes();

  console.log('notes?', notes);

  let rss = createRSSString({
    title: 'JAW Notes',
    link: notesUrl,
    description: 'Bitesize notes to remember nifty things, mostlty in web development.',
    items: notes.map((note) => ({
      title: note.title,
      description: note.abstract,
      pubDate: new Date(Date.now()).toISOString(), // TODO: note.publishedAt
      link: `${notesUrl}/${note.id}`,
      guid: `${notesUrl}/${note.id}`
    }))
  });

  return new Response(rss, {
    headers: new Headers({
      Accept: 'application/xml',
      'Content-Length': new TextEncoder().encode(rss).length.toString(),
      'Content-Type': 'application/rss+xml'
    })
  });
};
