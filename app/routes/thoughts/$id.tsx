import { useEffect } from 'react';
import { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { getBlogPost } from '~/features/blog/getBlogPost.server';
import { useHTMLSanitizer } from '~/utils/hooks/use-html-sanitizer';
import codeStylesUrl from '~/libs/syntax-highlighting/prismjs/prism.css';
import thoughtStylesUrl from '~/styles/thought.css';
// @ts-ignore
import Prism from '~/libs/syntax-highlighting/prismjs/prism';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: codeStylesUrl },
  { rel: 'stylesheet', href: thoughtStylesUrl },
];

export const loader: LoaderFunction = async ({ params }) => {
  return await getBlogPost(params.id);
};

export default function Thought() {
  let { content } = useLoaderData();
  let cleanContent = useHTMLSanitizer(content);

  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }, []);

  return (
    <div
      className="thoughtContainer"
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
}
