import { useLoaderData, LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';

export let loader: LoaderFunction = async ({ params }): Promise<string> => {
  invariant(params.slug, 'expected params.slug');

  // TODO: use slug to fetch content
  // TODO: redirect? when not found?
  return params.slug;
};

function PostSlug() {
  let slug = useLoaderData();

  return (
    <div className="content__container">
      <h1>{slug}</h1>
    </div>
  );
}

export default PostSlug;
