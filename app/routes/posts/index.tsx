import { useLoaderData, Link, LinksFunction } from 'remix';
import format from 'date-fns/format';
import type { IPost } from '~/data-loaders/posts.server';
import { getPosts } from '~/data-loaders/posts.server';
import blogStyles from '~/styles/blog.css';

// TODO: Extract date utils, and expose format fn
const DATE_FORMAT = 'yyyy-MM-dd';

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: blogStyles }];
};

export async function loader(): Promise<IPost[]> {
  let posts = await getPosts();
  return posts;
}

type PostProps = {
  slug: string;
  title: string;
  createdAt: Date;
};

function Post({ slug, title, createdAt }: PostProps) {
  return (
    <div>
      <h2 className="post__title">
        <Link to={slug}>{title}</Link>
      </h2>
      <time className="post__date" dateTime={format(createdAt, DATE_FORMAT)}>
        {format(createdAt, DATE_FORMAT)}
      </time>
    </div>
  );
}

function Posts() {
  let posts = useLoaderData<IPost[]>();

  return (
    <div className="content__container">
      <h1>Posts</h1>
      <ul className="blog__postList">
        {posts.map((post) => (
          <li key={post.slug}>
            <Post
              slug={post.slug}
              title={post.title}
              createdAt={new Date(post.createdAt)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
