import type { RequestHandler } from '@sveltejs/kit';
import { getStuff } from '../../../features/stuff/getStuff.server';
import { createRSSString } from '$lib/rss/rss-utils.server';

export let prerender = true;

export let GET: RequestHandler = async ({ url }) => {
  let stuffUrl = `${url.protocol}://${url.host}/stuff`;

  let stuff = await getStuff();

  let rss = createRSSString({
    title: 'JAW Stuff',
    link: stuffUrl,
    description: 'Stuff I find interesting enough to write about, or maybe just because.',
    items: stuff.map((stuffs) => ({
      title: stuffs.title,
      description: stuffs.abstract,
      pubDate: stuffs.publishedAt,
      link: `${stuffUrl}/${stuffs.id}`,
      guid: `${stuffUrl}/${stuffs.id}`
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
