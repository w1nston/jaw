import type { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import compareDesc from 'date-fns/compareDesc';
import format from 'date-fns/format';
import { getThoughts } from '~/features/thoughts/getThoughts.server';
import type { ThoughtMetadata } from '~/types/thoughts';
import thoughtsStylesUrl from '~/styles/thoughts.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: thoughtsStylesUrl },
];

export const loader: LoaderFunction = async () => {
  return await getThoughts();
};

type ThoughtLinkProps = {
  path: string;
  title: string;
  abstract: string;
  publishedAt: Date;
};

function ThoughtLink({ path, title, abstract, publishedAt }: ThoughtLinkProps) {
  return (
    <Link to={path}>
      <h2 className="thoughtLink__title">{title}</h2>
      <hr className="thoughtLink__divider" />
      <p className="thoughtLink__publishedAt">
        {`Published: ${format(publishedAt, 'yyyy-MM-dd')}`}
      </p>
      <p className="thoughtLink__abstract">{abstract}</p>
    </Link>
  );
}

function descendingOnPublished(
  postA: ThoughtMetadata,
  postB: ThoughtMetadata
): number {
  return compareDesc(new Date(postA.publishedAt), new Date(postB.publishedAt));
}

export default function Thoughts() {
  let thoughts = useLoaderData<ThoughtMetadata[]>();

  return (
    <div>
      <h1>Thoughts</h1>
      <ul className="thoughts-list">
        {thoughts.sort(descendingOnPublished).map((thought) => (
          <li key={thought.id}>
            <ThoughtLink
              publishedAt={new Date(thought.publishedAt)}
              abstract={thought.abstract}
              path={thought.id}
              title={thought.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
