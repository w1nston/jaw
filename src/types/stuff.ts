export type GetStuffFn = () => Promise<StuffMetadata[]>;
export type GetSpecificStuffFn = (id: string) => Promise<Stuff>;
export type GetStuffDraftsFn = () => Promise<StuffMetadata[]>;
export type GetSpecificStuffDraftFn = (id: string) => Promise<Stuff>;

export type StuffApi = {
  getStuff: GetStuffFn;
  getSpecificStuff: GetSpecificStuffFn;
  getStuffDrafts: GetStuffDraftsFn;
  getSpecificStuffDraft: GetSpecificStuffDraftFn;
};

export type Stuff = {
  content: string | Promise<string>;
};

export type StuffMetadata = {
  id: string;
  title: string;
  abstract: string;
  tags: string[];
  publishedAt: string;
};
