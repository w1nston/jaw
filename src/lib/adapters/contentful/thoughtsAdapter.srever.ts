import { env } from '$env/dynamic/private';
import { createApi, type Api } from '$lib/apis/apiFactory.server';
import { marked } from 'marked';
import type { GetThoughtFn, GetThoughtsFn, Thought, ThoughtApi, ThoughtMetadata } from "../../../types/thoughts";

export function transformThoughts(entries: any): ThoughtMetadata[] {
  return entries.items.map((item: any) => {
    let { id, createdAt } = item.sys;
    let { title, abstract } = item.fields;

    return {
      id,
      title,
      abstract,
      publishedAt: createdAt,
    } satisfies ThoughtMetadata;
  });
}


export function transformThought(entry: any): Thought {
  let { content } = entry.fields;

  return {
    content: marked.parse(content),
  };
}

function createGetThoughts(api: Api): GetThoughtsFn {
  return async function getThoughts(): Promise<ThoughtMetadata[]> {
    let entries = await api.get(
      `/spaces/${env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=jawThought`
    );

    return transformThoughts(entries);
  };
}

function createGetThought(api: Api): GetThoughtFn {
  return async function getThought(id: string): Promise<Thought> {
    let entry = await api.get(
      `/spaces/${env.CONTENTFUL_SPACE_ID}/environments/master/entries/${id}`
    );

    return transformThought(entry);
  };
}

function createGetThoughtDraft(api: Api): GetThoughtFn {
  return async function getThoughtDraft(id: string): Promise<Thought> {
    let entry = await api.get(
      `/spaces/${env.CONTENTFUL_SPACE_ID}/environments/master/entries/${id}`
    );

    return transformThought(entry);
  };
}

export function createContentfulThoughtsApi(): ThoughtApi {
  let deliveryApiOptions = {
    headers: new Headers({
      Authorization: `Bearer ${env.CONTENTFUL_DELIVERY_API_TOKEN}`,
    }),
  };

  let deliveryApi = createApi(env.CONTENTFUL_DELIVERY_BASE_URL, deliveryApiOptions);

  let previewApiOptions = {
    headers: new Headers({
      Authorization: `Bearer ${env.CONTENTFUL_PREVIEW_API_TOKEN}`,
    }),
  };

  let previewApi = createApi(env.CONTENTFUL_PREVIEW_BASE_URL, previewApiOptions);

  return {
    getThoughts: createGetThoughts(deliveryApi),
    getThought: createGetThought(deliveryApi),
    getThoughtDraft: createGetThoughtDraft(previewApi),
  };
}
