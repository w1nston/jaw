import type { BlogPost } from '~/types/blog';

export function getBlogPosts(): Promise<BlogPost[]> {
  // TODO: contact contentful api from some abstraction here..
  return Promise.resolve([]);
}
