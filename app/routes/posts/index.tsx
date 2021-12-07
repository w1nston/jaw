import { useLoaderData, Link, LinksFunction } from 'remix';
import type { Post } from '~/data-loaders/posts.server';
import { getPosts } from '~/data-loaders/posts.server';
import blogStyles from '~/styles/blog.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap',
    },
    { rel: 'stylesheet', href: blogStyles },
  ];
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
            <div className="blog__postLine" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
