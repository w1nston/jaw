import { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { getSpecificStuff } from '~/features/stuff/getSpecificStuff.server';
import { Stuff } from '~/types/stuff';
import { usePrismHighlight } from '~/utils/hooks/use-prism-highlight';
import { useHTMLSanitizer } from '../utils/hooks/use-html-sanitizer';
import codeStylesUrl from '~/libs/syntax-highlighting/prismjs/prism.css';

export let links: LinksFunction = () => [
  { rel: 'stylesheet', href: codeStylesUrl },
];

export let loader: LoaderFunction = async ({ params }) => {
  let { id } = params;

  if (!id) {
    throw new Error("Can't get stuff without ID!");
  }

  return await getSpecificStuff(id);
};

export function ErrorBoundary({ error }: { error: unknown }) {
  console.error(error); // TODO

  return (
    <p>
      Something went wrong fetching specific stuff. Try reloading the page, and
      if that doesn't work, go back to the list of stuff, maybe there's other
      stuff?
    </p>
  );
}

export default function SpecificStuff() {
  let { content } = useLoaderData<Stuff>();

  let cleanContent = useHTMLSanitizer(content);

  usePrismHighlight();

  return (
    <div
      className="specificStuffContainer"
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
}
