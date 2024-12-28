export type GetNotesFn = () => Promise<NoteMetadata[]>;
export type GetNoteFn = (id: string) => Promise<Note>;

export type NoteApi = {
  getNotes: GetNotesFn;
  getNote: GetNoteFn;
};

export type Note = {
  content: string | Promise<string>;
}

export type NoteMetadata = {
  id: string;
  title: string;
  abstract: string;
  tags: string[];
  publishedAt: string;
};
