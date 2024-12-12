import type { NoteMetadata } from '../../types/notes';
import { getNotesApi } from '$lib/apis/notesApi.server';

export function getNotes(): Promise<NoteMetadata[]> {
  let notesApi = getNotesApi();
  return notesApi.getNotes();
}