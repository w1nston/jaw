import type { LoaderFunction } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { getBlogPosts } from '~/features/blog/getBlogPosts.server';

export const loader: LoaderFunction = async () => {
  return await getBlogPosts();
};

export default function Thoughts() {
  let posts = useLoaderData();
  // TODO: how to show slug in url, but use id ... without having to fetch all posts
  //       and match on slug... ?

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
