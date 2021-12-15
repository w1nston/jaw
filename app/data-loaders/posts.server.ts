import subDays from 'date-fns/subDays';

export type IPost = {
  createdAt: string;
  // Hmm... id?
  slug: string;
  title: string;
};

export function getPosts(): Promise<IPost[]> {
  return Promise.resolve([
    {
      slug: 'my-first-post',
      title: 'My First Post',
      createdAt: subDays(Date.now(), 1),
    },
    {
      slug: '90s-mixtape',
      title: 'A Mixtape I Made Just For You',
      createdAt: subDays(Date.now(), 2),
    },
    {
      slug: 'my-post',
      title: 'My Post',
      createdAt: subDays(Date.now(), 3),
    },
    {
      slug: 'my-other-post',
      title: 'My Other Post',
      createdAt: subDays(Date.now(), 4),
    },
    {
      slug: '70s-mixtape',
      title: 'A Mixtape I Made Just For You',
      createdAt: subDays(Date.now(), 5),
    },
    {
      slug: 'my-last-post',
      title: 'My Last Post',
      createdAt: subDays(Date.now(), 6),
    },
  ]);
}
