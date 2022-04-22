import { marked } from 'marked';
import { transformBlogPosts } from '~/adapters/contentful/contentfulAdapter.server';
import type { BlogApi, BlogPost } from '~/types/blog';
import { createApi, Api } from './apiFactory.server';

declare global {
  let CONTENTFUL_BASE_URL: string;
  let CONTENTFUL_DELIVERY_API_TOKEN: string;
  let CONTENTFUL_SPACE_ID: string;
}

let api: BlogApi | null = null;

// TODO: types
function createGetPosts(api: Api) {
  return async function getPosts() {
    let entries = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=blogPost`
    );

    let posts = transformBlogPosts(entries);

    return posts;
  };
}

function createGetPost(api: Api) {
  return async function getPost(id: string): Promise<BlogPost> {
    let entry = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries/${id}`
    );

    // TODO: use invariant

    let { id: _id, title, content } = entry.fields;

    return {
      id: _id,
      title,
      content: marked.parse(content),
    };
  };
}

function createBlogApi(): BlogApi {
  let options = {
    headers: new Headers({
      Authorization: `Bearer ${CONTENTFUL_DELIVERY_API_TOKEN}`,
    }),
  };

  let api = createApi(CONTENTFUL_BASE_URL, options);

  return {
    getPosts: createGetPosts(api),
    getPost: createGetPost(api),
  };
}

export function getBlogApi(): BlogApi {
  if (!api) {
    api = createBlogApi();
  }

  return api;
}
