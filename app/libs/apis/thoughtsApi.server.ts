import {
  transformThought,
  transformThoughts,
} from '~/adapters/contentful/contentfulAdapter.server';
import type {
  GetThoughtFn,
  GetThoughtsFn,
  Thought,
  ThoughtApi,
  ThoughtMetadata,
} from '~/types/thoughts';
import { createApi, Api } from './apiFactory.server';

declare global {
  let CONTENTFUL_BASE_URL: string;
  let CONTENTFUL_DELIVERY_API_TOKEN: string;
  let CONTENTFUL_SPACE_ID: string;
}

let api: ThoughtApi | null = null;

function createGetThoughts(api: Api): GetThoughtsFn {
  return async function getThoughts(): Promise<ThoughtMetadata[]> {
    let entries = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=blogPost`
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

function createThoughtsApi(): ThoughtApi {
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

export function getThoughtsApi(): ThoughtApi {
  if (!api) {
    api = createThoughtsApi();
  }

  return api;
}
