import { useEffect } from 'react';
import { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import hljs from 'highlight.js';
import { getBlogPost } from '~/features/blog/getBlogPost.server';
import { useHTMLSanitizer } from '~/utils/hooks/use-html-sanitizer';
import codeStylesUrl from 'node_modules/highlight.js/styles/lioshi.css';
import thoughtStylesUrl from '~/styles/thought.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: codeStylesUrl },
  { rel: 'stylesheet', href: thoughtStylesUrl },
];

export const loader: LoaderFunction = async ({ params }) => {
  return await getBlogPost(params.id);
};

export default function ThoughtSlug() {
  let { content } = useLoaderData();
  let cleanContent = useHTMLSanitizer(content);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div
      className="thoughtContainer"
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
}
