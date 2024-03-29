import { useEffect } from 'react';
import { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { useHTMLSanitizer } from '~/utils/hooks/use-html-sanitizer';
import codeStylesUrl from '~/libs/syntax-highlighting/prismjs/prism.css';
import thoughtStylesUrl from '~/styles/thought.css';
import { getNote } from '~/features/notes/getNote.server';
import type { Note } from '~/types/notes';
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

  return await getNote(id);
};

export function ErrorBoundary({ error }: { error: unknown }) {
  console.error(error); // TODO

  return (
    <p>
      Something went wrong fetching the note. Try reloading the page, and if
      that doesn't work, go back to the notes list, maybe the thought flew away?
    </p>
  );
}

export default function ANote() {
  let { content } = useLoaderData<Note>();

  let cleanContent = useHTMLSanitizer(content);

  usePrismHighlight();

  return (
    <div
      className="noteContainer"
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
}
