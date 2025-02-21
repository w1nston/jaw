import { env } from '$env/dynamic/private';
import { marked } from 'marked';
import { createApi } from '$lib/apis/apiFactory.server';
import type { Api } from '$lib/apis/apiFactory.server';
import type { GetNotesFn, GetNoteFn, Note, NoteApi, NoteMetadata } from '../../../types/notes';

function transformNotes(entries: any): NoteMetadata[] {
  return entries.items.map((item: any) => {
    let { id, createdAt } = item.sys;
    let { title, abstract, tags } = item.fields;

    return {
      id,
      title,
      abstract,
      tags,
      publishedAt: createdAt
    } satisfies NoteMetadata;
  });
}

function transformNote(entry: any): Note {
  let { content } = entry.fields;
  return { content: marked.parse(content) };
}

function createGetNotes(api: Api): GetNotesFn {
  return async function getNotes(): Promise<NoteMetadata[]> {
    let entries = await api.get(
      `/spaces/${env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=jawNote`
    );

    return transformNotes(entries);
  };
}

function createGetNote(api: Api): GetNoteFn {
  return async function getNote(id: string): Promise<Note> {
    let entry = await api.get(
      `/spaces/${env.CONTENTFUL_SPACE_ID}/environments/master/entries/${id}`
    );

    return transformNote(entry);
  };
}

export function createContentfulNotesApi(): NoteApi {
  let deliveryApiOptions = {
    headers: new Headers({
      Authorization: `Bearer ${env.CONTENTFUL_DELIVERY_API_TOKEN}`,
    }),
  };

  let deliveryApi = createApi(env.CONTENTFUL_DELIVERY_BASE_URL, deliveryApiOptions);

  return {
    getNotes: createGetNotes(deliveryApi),
    getNote: createGetNote(deliveryApi),
  };
}
