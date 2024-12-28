import { env } from '$env/dynamic/private';
import { createApi, type Api } from '$lib/apis/apiFactory.server';
import { marked } from 'marked';
import type { GetSpecificStuffFn, GetStuffFn, Stuff, StuffApi, StuffMetadata } from '../../../types/stuff';

function transformStuff(entries: any): StuffMetadata[] {
  return entries.items.map((item: any) => {
    let { id, createdAt } = item.sys;
    let { title, abstract, tags } = item.fields;

    return {
      id,
      title,
      abstract,
      tags,
      publishedAt: createdAt
    } satisfies StuffMetadata;
  });
}

function transformSpecificStuff(entry: any): Stuff {
  let { content } = entry.fields;
  return { content: marked.parse(content) };
}

function createGetStuff(api: Api): GetStuffFn {
  return async function getStuff(): Promise<StuffMetadata[]> {
    let entries = await api.get(
      `/spaces/${env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=jawStuff`
    );

    return transformStuff(entries);
  };
}

function createGetSpecificStuff(api: Api): GetSpecificStuffFn {
  return async function getSpecificStuff(id: string): Promise<Stuff> {
    let entry = await api.get(
      `/spaces/${env.CONTENTFUL_SPACE_ID}/environments/master/entries/${id}`
    );

    return transformSpecificStuff(entry);
  };
}

export function createContentfulStuffApi(): StuffApi {
  let deliveryApiOptions = {
    headers: new Headers({
      Authorization: `Bearer ${env.CONTENTFUL_DELIVERY_API_TOKEN}`,
    }),
  };

  let deliveryApi = createApi(env.CONTENTFUL_DELIVERY_BASE_URL, deliveryApiOptions);

  return {
    getStuff: createGetStuff(deliveryApi),
    getSpecificStuff: createGetSpecificStuff(deliveryApi),
  };
}
