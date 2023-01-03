import { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { getStuff } from '~/features/stuff/getStuff.server';
import stuffStylesUrl from '~/styles/stuff.css';
import { StuffMetadata } from '~/types/stuff';

export let links: LinksFunction = () => [
  { rel: 'stylesheet', href: stuffStylesUrl },
];

export let loader: LoaderFunction = async () => {
  return await getStuff();
};

type StuffLinkProps = {
  path: string;
  title: string;
  abstract: string;
  tags: string[];
};

function StuffLink({ path, title, abstract, tags }: StuffLinkProps) {
  return (
    <Link to={path}>
      <h2 className="StuffLink__title">{title}</h2>
      <hr className="StuffLink__divider" />
      <p className="StuffLink__abstract">{abstract}</p>
      <div className="StuffLink__tagContainer">
        {tags.map((tag) => (
          <span className="StuffLink__tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default function Stuff() {
  let stuff: StuffMetadata[] = useLoaderData<StuffMetadata[]>();

  return (
    <div>
      <h1>Stuff</h1>
      <ul className="stuff-list">
        {stuff.map(({ id, tags, abstract, title }) => (
          <li key={id}>
            <StuffLink
              tags={tags}
              abstract={abstract}
              path={id}
              title={title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
