import type { NoteMetadata } from '~/types/notes';
import { getNotesApi } from '~/libs/apis/notesApi.server';

export function getNotes(): Promise<NoteMetadata[]> {
  let notesApi = getNotesApi();
  return notesApi.getNotes();
}
