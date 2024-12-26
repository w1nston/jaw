import format from 'date-fns/format';

export type Item = {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  guid: string;
};

type Input = {
  title: string;
  link: string;
  description: string;
  items: Item[];
};

function cdata(data: string): string {
  return `<![CDATA[${data}]]>`;
}

export function createRSSString({ title, link, description, items}: Input): string {
  return `
    <rss version="2.0">
      <channel>
        <title>${title}</title>
        <link>${link}</link>
        <description>${description}</description>
        <language>en-us</language>
        <ttl>40</ttl>
        ${items.map((item) =>
          `
          <item>
            <title>${cdata(item.title)}</title>
            <description>${cdata(item.description)}</description>
            <pubDate>${format(new Date(item.pubDate), 'E, MMM dd yyyy')}</pubDate>
            <link>${item.link}</link>
            <guid>${item.guid}</guid>
          </item>
        `.trim()
        )}
      </channel>
    </rss>
  `.trim();
}
