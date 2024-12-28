export type GetStuffFn = () => Promise<StuffMetadata[]>;
export type GetSpecificStuffFn = (id: string) => Promise<Stuff>;

export type StuffApi = {
  getStuff: GetStuffFn;
  getSpecificStuff: GetSpecificStuffFn;
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
