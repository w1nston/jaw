import { marked } from 'marked';
import { createApi } from '~/libs/apis/apiFactory.server';
import type { Api } from '~/libs/apis/apiFactory.server';
import type { Thought, ThoughtApi, ThoughtMetadata } from '~/types/thoughts';
import type { GetThoughtFn, GetThoughtsFn } from '../../types/thoughts';

declare global {
  let CONTENTFUL_BASE_URL: string;
  let CONTENTFUL_DELIVERY_API_TOKEN: string;
  let CONTENTFUL_SPACE_ID: string;
}

function createGetThoughts(api: Api): GetThoughtsFn {
  return async function getThoughts(): Promise<ThoughtMetadata[]> {
    let entries = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=jawThought`
    );

    return transformThoughts(entries);
  };
}

function createGetThought(api: Api): GetThoughtFn {
  return async function getPost(id: string): Promise<Thought> {
    let entry = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries/${id}`
    );

    return transformThought(entry);
  };
}

export function createContentfulThoughtsApi(): ThoughtApi {
  let options = {
    headers: new Headers({
      Authorization: `Bearer ${CONTENTFUL_DELIVERY_API_TOKEN}`,
    }),
  };

  let api = createApi(CONTENTFUL_BASE_URL, options);

  return {
    getThoughts: createGetThoughts(api),
    getThought: createGetThought(api),
  };
}

export function transformThoughts(entries: any): ThoughtMetadata[] {
  return entries.items.map((item: any) => {
    let { id, createdAt } = item.sys;
    let { title, abstract } = item.fields;

    return {
      id,
      title,
      abstract,
      publishedAt: createdAt,
    };
  });
}

export function transformThought(entry: any): Thought {
  let { content } = entry.fields;

  return {
    content: marked.parse(content),
  };
}
