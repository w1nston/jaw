import { HeadersFunction, LoaderFunction } from '@remix-run/cloudflare';
import format from 'date-fns/format';
import { getThoughts } from '~/features/thoughts/getThoughts.server';
import { getDomainUrl } from '~/utils/url-utils';

function cdata(data: string): string {
  return `<![CDATA[${data}]]>`;
}

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

  let rss = `
    <rss version="2.0">
      <channel>
        <title>JAW Thoughts</title>
        <link>${thoughtsUrl}</link>
        <description>Thoughts of JAW</description>
        <language>en-us</language>
        <ttl>40</ttl>
        ${thoughts.map((thought) =>
          `
          <item>
            <title>${cdata(thought.title) ?? 'Thoughtless title'}</title>
            <description>${
              cdata(thought.abstract) ?? 'No description'
            }</description>
            <pubDate>${format(
              new Date(thought.publishedAt),
              'E, MMM dd yyyy'
            )}</pubDate>
            <link>${thoughtsUrl}/${thought.id}</link>
            <guid>${thoughtsUrl}/${thought.id}</guid>
          </item>
        `.trim()
        )}
      </channel>
    </rss>
  `.trim();

  return new Response(rss, {
    headers: new Headers({
      Accept: 'application/xml',
      'Content-Length': new TextEncoder().encode(rss).length.toString(),
      'Content-Type': 'application/xml',
    }),
  });
};
