import { HeadersFunction, LoaderFunction } from '@remix-run/cloudflare';
import { getThoughts } from '~/features/thoughts/getThoughts.server';
import { createRSSString } from '~/utils/rss-utils';
import { getDomainUrl } from '~/utils/url-utils';

export let headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    Accept: loaderHeaders.get('Accept') ?? 'application/xml',
    'Content-Length': loaderHeaders.get('Content-Length') ?? '',
    'Content-Type': loaderHeaders.get('Content-Type') ?? 'application/xml',
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  let thoughtsUrl = `${getDomainUrl(request)}/thoughts`;

  let thoughts = await getThoughts();

  let rss = createRSSString({
    title: 'JAW Thoughts',
    link: thoughtsUrl,
    description: 'Thoughts of JAW',
    items: thoughts.map((thought) => ({
      title: thought.title,
      description: thought.abstract,
      pubDate: thought.publishedAt,
      link: `${thoughtsUrl}/${thought.id}`,
      guid: `${thoughtsUrl}/${thought.id}`,
    })),
  });

  return new Response(rss, {
    headers: new Headers({
      Accept: 'application/xml',
      'Content-Length': new TextEncoder().encode(rss).length.toString(),
      'Content-Type': 'application/xml',
    }),
  });
};
