import { createContentfulThoughtsApi } from '~/adapters/contentful/contentfulAdapter.server';
import type { ThoughtApi } from '~/types/thoughts';

let api: ThoughtApi | null = null;

function createThoughtsApi(): ThoughtApi {
  return createContentfulThoughtsApi();
}

export function getThoughtsApi(): ThoughtApi {
  if (!api) {
    api = createThoughtsApi();
  }

  return api;
}
