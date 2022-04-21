import { useEffect } from 'react';
import { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import hljs from 'highlight.js';
import { getBlogPost } from '~/features/blog/getBlogPost.server';
import { useHTMLSanitizer } from '~/utils/hooks/use-html-sanitizer';
import codeStylesUrl from 'node_modules/highlight.js/styles/lioshi.css';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: codeStylesUrl,
  },
];

export const loader: LoaderFunction = async ({ params }) => {
  return await getBlogPost(params.slug);
};

export default function ThoughtSlug() {
  let { content } = useLoaderData();
  let cleanContent = useHTMLSanitizer(content);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
    </main>
  );
}
