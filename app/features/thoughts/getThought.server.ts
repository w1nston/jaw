import type { Thought } from '~/types/thoughts';
import { getThoughtsApi } from '~/libs/apis/thoughtsApi.server';

export function getThought(id: string): Promise<Thought> {
  let thoughtsApi = getThoughtsApi();
  return thoughtsApi.getThought(id);
}

export function getThoughtDraft(id: string): Promise<Thought> {
  let thoughtsApi = getThoughtsApi();
  return thoughtsApi.getThoughtDraft(id);
}
