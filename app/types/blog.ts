export type BlogPost = {
  id: string;
  title: string;
  content: string;
};

export type BlogApi = {
  getPosts: () => Promise<BlogPost[]>;
  getPost: (slug: string) => Promise<BlogPost>;
};
