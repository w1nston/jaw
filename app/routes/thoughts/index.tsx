import type { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import type { ReactNode } from 'react';
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

function RSSIcon() {
  return (
    <Link to="/thoughts/feed" reloadDocument>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 16 16"
      >
        <path
          fill="#0042ff"
          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0a8 8 0 0 0-8-8a1 1 0 0 1 0-2zm0 4a6 6 0 0 1 6 6a1 1 0 1 1-2 0a4 4 0 0 0-4-4a1 1 0 0 1 0-2zm.5 7a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3z"
        />
      </svg>
    </Link>
  );
}

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

function Headline({ children }: { children: ReactNode }) {
  return (
    <div className="headlineContainer">
      <h1>{children}</h1>
      <RSSIcon />
    </div>
  );
}

function descendingOnPublished(
  postA: ThoughtMetadata,
  postB: ThoughtMetadata
): number {
  return compareDesc(new Date(postA.publishedAt), new Date(postB.publishedAt));
}

export default function Thoughts() {
  let thoughts: ThoughtMetadata[] = useLoaderData<ThoughtMetadata[]>();

  if (thoughts.length < 1) {
    return (
      <div>
        <Headline>Thoughts</Headline>
        <p>Currently thinking...</p>
      </div>
    );
  }

  return (
    <div>
      <Headline>Thoughts</Headline>
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
