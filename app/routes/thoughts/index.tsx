import type { LinksFunction, LoaderFunction } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { getBlogPosts } from '~/features/blog/getBlogPosts.server';
import type { BlogPost } from '~/types/blog';
import thoughtsStylesUrl from '~/styles/thoughts.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: thoughtsStylesUrl },
];

export const loader: LoaderFunction = async () => {
  return await getBlogPosts();
};

export default function Thoughts() {
  let posts = useLoaderData<BlogPost[]>();

  return (
    <div>
      <h1>Posts</h1>
      <ul className="thoughts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
