export type ThoughtMetadata = {
  id: string;
  title: string;
  abstract: string;
  publishedAt: string;
};

export type Thought = {
  content: string;
};

export type GetThoughtsFn = () => Promise<ThoughtMetadata[]>;
export type GetThoughtFn = (id: string) => Promise<Thought>;

export type ThoughtApi = {
  getThoughts: GetThoughtsFn;
  getThought: GetThoughtFn;
};
