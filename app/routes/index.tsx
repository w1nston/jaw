import type { LoaderFunction } from 'remix';
import { getBlogPosts } from '~/features/blog/getBlogPosts';

export const loader: LoaderFunction = async () => {
  // TODO: not sure where to place json method, should probably be here?
  return await getBlogPosts();
};

export default function Index() {
  return (
    <div>
      <header>Header</header>
      <main>Content</main>
    </div>
  );
}
