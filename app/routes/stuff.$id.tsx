import { LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { getSpecificStuff } from '~/features/stuff/getSpecificStuff.server';
import Prism from '~/libs/syntax-highlighting/prismjs/prism';
import { Stuff } from '~/types/stuff';
import { useHTMLSanitizer } from '../utils/hooks/use-html-sanitizer';

export let loader: LoaderFunction = async ({ params }) => {
  let { id } = params;

  if (!id) {
    throw new Error("Can't get stuff without ID!");
  }

  return await getSpecificStuff(id);
};

// TODO: types
export function ErrorBoundary({ error }) {
  console.error(error); // TODO

  return (
    <p>
      Something went wrong fetching specific stuff. Try reloading the page, and
      if that doesn't work, go back to the list of stuff, maybe ther's other
      stuff?
    </p>
  );
}

export default function SpecificStuff() {
  let { content } = useLoaderData<Stuff>();

  let cleanContent = useHTMLSanitizer(content);

  // TODO: extract hook
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }, []);

  return (
    <div
      className="specificStuffContainer"
      dangerouslySetInnerHTML={{ __html: cleanContent }}
    />
  );
}
