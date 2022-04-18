import { getBlogApi } from '../../libs/apis/blogApi.server';
// TODO: types
export function getBlogPost(slug: string) {
  let blogApi = getBlogApi();
  return blogApi.getPost(slug);
}
