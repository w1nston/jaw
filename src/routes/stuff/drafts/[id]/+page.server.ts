import { getSpecificStuffDraft } from '../../../../features/stuff/getSpecificStuffDraft';
import type { PageServerLoad } from './$types';

export let load: PageServerLoad = async ({ params }) => {
  if (!params.id || params.id === '') {
    throw new Error("Can't get specific stuff without an id...");
  }

  return {
    specificStuffDraft: await getSpecificStuffDraft(params.id)
  };
};
