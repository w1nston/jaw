export type BlogPost = {
  id: string;
  title: string;
  abstract: string;
  content: string;
  publishedAt: string;
};

export type BlogApi = {
  getPosts: () => Promise<BlogPost[]>;
  getPost: (slug: string) => Promise<BlogPost>;
};
