import { createContentfulStuffApi } from '~/adapters/contentful/contentfulAdapter.server';
import type { StuffApi } from '~/types/stuff';

let api: StuffApi | null = null;

function createStuffApi(): StuffApi {
  return createContentfulStuffApi();
}

export function getStuffApi(): StuffApi {
  if (!api) {
    api = createStuffApi();
  }

  return api;
}
