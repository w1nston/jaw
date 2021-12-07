export type Post = {
  // Hmm... id?
  title: string;
  slug: string;
};

export function getPosts(): Promise<Post[]> {
  return Promise.resolve([
    {
      slug: 'my-first-post',
      title: 'My First Post',
    },
    {
      slug: '90s-mixtape',
      title: 'A Mixtape I Made Just For You',
    },
    {
      slug: 'my-last-post',
      title: 'My Last Post',
    },
  ]);
}