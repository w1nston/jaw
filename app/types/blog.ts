export type BlogPost = {
  title: string;
  content: string;
};

export type BlogApi = {
  getPosts: () => Promise<BlogPost[]>;
  getPost: (slug: string) => Promise<BlogPost>;
};
