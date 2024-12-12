import { getThoughtsApi } from '$lib/apis/thoughtsApi.server';
import type { ThoughtMetadata } from '../../types/thoughts';

export function getThoughts(): Promise<ThoughtMetadata[]> {
  let thoughtsApi = getThoughtsApi();
  return thoughtsApi.getThoughts();
}
