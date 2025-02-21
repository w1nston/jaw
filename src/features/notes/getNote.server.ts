import { getNotesApi } from "$lib/apis/notesApi.server";
import type { Note } from "../../types/notes";

export function getNote(id: string): Promise<Note> {
  let notesApi = getNotesApi();
  return notesApi.getNote(id);
}
