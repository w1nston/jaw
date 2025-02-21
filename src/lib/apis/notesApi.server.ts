import { createContentfulNotesApi } from '$lib/adapters/contentful/notesAdapter.server';
import type { NoteApi } from '../../types/notes';

let api: NoteApi | null = null;

function createNotesApi(): NoteApi {
  return createContentfulNotesApi();
}

export function getNotesApi(): NoteApi {
  if (!api) {
    api = createNotesApi();
  }

  return api;
}
