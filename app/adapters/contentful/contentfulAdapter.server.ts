import { marked } from 'marked';
import { createApi } from '~/libs/apis/apiFactory.server';
import type { Api } from '~/libs/apis/apiFactory.server';
import type {
  Thought,
  ThoughtApi,
  ThoughtMetadata,
  GetThoughtFn,
  GetThoughtsFn,
} from '~/types/thoughts';
import type { GetNotesFn, Note, NoteApi, NoteMetadata } from '~/types/notes';
import { GetNoteFn } from '../../types/notes';

declare global {
  let CONTENTFUL_DELIVERY_BASE_URL: string;
  let CONTENTFUL_DELIVERY_API_TOKEN: string;
  let CONTENTFUL_PREVIEW_BASE_URL: string;
  let CONTENTFUL_PREVIEW_API_TOKEN: string;
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
  return async function getThought(id: string): Promise<Thought> {
    let entry = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries/${id}`
    );

    return transformThought(entry);
  };
}

function createGetThoughtDraft(api: Api): GetThoughtFn {
  return async function getThoughtDraft(id: string): Promise<Thought> {
    let entry = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries/${id}`
    );

    return transformThought(entry);
  };
}

export function createContentfulThoughtsApi(): ThoughtApi {
  let deliveryApiOptions = {
    headers: new Headers({
      Authorization: `Bearer ${CONTENTFUL_DELIVERY_API_TOKEN}`,
    }),
  };

  let deliveryApi = createApi(CONTENTFUL_DELIVERY_BASE_URL, deliveryApiOptions);

  let previewApiOptions = {
    headers: new Headers({
      Authorization: `Bearer ${CONTENTFUL_PREVIEW_API_TOKEN}`,
    }),
  };

  let previewApi = createApi(CONTENTFUL_PREVIEW_BASE_URL, previewApiOptions);

  return {
    getThoughts: createGetThoughts(deliveryApi),
    getThought: createGetThought(deliveryApi),
    getThoughtDraft: createGetThoughtDraft(previewApi),
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

function transformNotes(entries: any): NoteMetadata[] {
  return entries.items.map((item: any) => {
    let { id } = item.sys;
    let { title, abstract, tags } = item.fields;

    return {
      id,
      title,
      abstract,
      tags,
    };
  });
}

function transformNote(entry: any): Note {
  let { content } = entry.fields;
  return { content: marked.parse(content) };
}

function createGetNotes(api: Api): GetNotesFn {
  return async function getNotes(): Promise<NoteMetadata[]> {
    let entries = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=jawNote`
    );

    return transformNotes(entries);
  };
}

function createGetNote(api: Api): GetNoteFn {
  return async function getNote(id: string): Promise<Note> {
    let entry = await api.get(
      `/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries/${id}`
    );

    return transformNote(entry);
  };
}

export function createContentfulNotesApi(): NoteApi {
  let deliveryApiOptions = {
    headers: new Headers({
      Authorization: `Bearer ${CONTENTFUL_DELIVERY_API_TOKEN}`,
    }),
  };

  let deliveryApi = createApi(CONTENTFUL_DELIVERY_BASE_URL, deliveryApiOptions);

  return {
    getNotes: createGetNotes(deliveryApi),
    getNote: createGetNote(deliveryApi),
  };
}
