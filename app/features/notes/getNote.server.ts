import type { Note } from '~/types/notes';
import { getNotesApi } from '~/libs/apis/notesApi.server';

export function getNote(id: string): Promise<Note> {
  let notesApi = getNotesApi();
  return notesApi.getNote(id);
}
