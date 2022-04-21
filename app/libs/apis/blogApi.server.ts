import { marked } from 'marked';
import hljs from 'highlight.js';
import { transformBlogPosts } from '~/adapters/contentful/contentfulAdapter.server';
import type { BlogApi, BlogPost } from '~/types/blog';
import { createApi } from './apiFactory.server';

declare global {
  let CONTENTFUL_BASE_URL: string;
  let CONTENTFUL_DELIVERY_API_TOKEN: string;
  let CONTENTFUL_SPACE_ID: string;
}

let api: BlogApi | null = null;

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

// TODO: types
function createGetPosts(api) {
  return async function getPosts() {
    let entries = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=blogPost`
    );

    let posts = transformBlogPosts(entries);

    // TODO: do I need json from remix package?
    return posts;
  };
}

// TODO
function createGetPost(api: BlogApi) {
  return async function getPost(id: string): Promise<BlogPost> {
    // TODO: AHA! need entry ID in posts request
    let entry = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries/${id}`
    );

    console.log(entry.fields);

    let { title, content } = entry.fields;

    // TODO: use marked to parse markdown
    // TODO: use https://github.com/cure53/DOMPurify to sanitize result
    return {
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
