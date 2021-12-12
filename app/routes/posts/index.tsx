import { useLoaderData, Link, LinksFunction } from 'remix';
import type { Post } from '~/data-loaders/posts.server';
import { getPosts } from '~/data-loaders/posts.server';
import blogStyles from '~/styles/blog.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: blogStyles }];
};

export async function loader(): Promise<Post[]> {
  const posts = await getPosts();
  return posts;
}

function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="content__container">
      <h1>Posts</h1>
      <ul className="blog__postList">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
