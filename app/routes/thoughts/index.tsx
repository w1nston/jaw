import type { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import format from 'date-fns/format';
import { getBlogPosts } from '~/features/blog/getBlogPosts.server';
import type { BlogPost } from '~/types/blog';
import thoughtsStylesUrl from '~/styles/thoughts.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: thoughtsStylesUrl },
];

export const loader: LoaderFunction = async () => {
  return await getBlogPosts();
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
        {`Published at: ${format(publishedAt, 'yyyy-MM-dd')}`}
      </p>
      <p className="thoughtLink__abstract">{abstract}</p>
    </Link>
  );
}

export default function Thoughts() {
  let posts = useLoaderData<BlogPost[]>();

  return (
    <div>
      <h1>Thoughts</h1>
      <ul className="thoughts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <ThoughtLink
              publishedAt={new Date(post.publishedAt)}
              abstract={post.abstract}
              path={post.id}
              title={post.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
