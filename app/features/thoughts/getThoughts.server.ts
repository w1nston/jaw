import type { ThoughtMetadata } from '~/types/thoughts';
import { getThoughtsApi } from '~/libs/apis/thoughtsApi.server';

export function getThoughts(): Promise<ThoughtMetadata[]> {
  let thoughtsApi = getThoughtsApi();
  return thoughtsApi.getThoughts();
}
