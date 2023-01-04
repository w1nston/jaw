import { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { useHTMLSanitizer } from '~/utils/hooks/use-html-sanitizer';
import codeStylesUrl from '~/libs/syntax-highlighting/prismjs/prism.css';
import thoughtStylesUrl from '~/styles/thought.css';
import { getThoughtDraft } from '~/features/thoughts/getThought.server';
import type { Thought } from '~/types/thoughts';
import { usePrismHighlight } from '~/utils/hooks/use-prism-highlight';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: codeStylesUrl },
  { rel: 'stylesheet', href: thoughtStylesUrl },
];

export const loader: LoaderFunction = async ({ params }) => {
  let { id } = params;

  if (!id) {
    throw new Error("Can't get a thought without ID!");
  }

  return await getThoughtDraft(id);
};

export function ErrorBoundary({ error }: { error: unknown; }) {
  console.error(error); // TODO

  return (
    <p>
      Something went wrong fetching the thought. Try reloading the page, and if
      that doesn't work, go back to the thoughts list, maybe the thought flew
      away?
    </p>
  );
}

export default function Draft() {
  let { content } = useLoaderData<Thought>();

  let cleanContent = useHTMLSanitizer(content);

  usePrismHighlight();

  return (
    <div
      className="thoughtContainer"
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
}
