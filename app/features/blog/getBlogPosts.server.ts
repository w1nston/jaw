import type { BlogPost } from '~/types/blog';
import { getBlogApi } from '~/libs/apis/blogApi.server';

export function getBlogPosts(): Promise<BlogPost[]> {
  let blogApi = getBlogApi();
  return blogApi.getPosts();
}
