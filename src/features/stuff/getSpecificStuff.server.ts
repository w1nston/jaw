import { getStuffApi } from "$lib/apis/stuffApi.server";
import type { Stuff } from '../../types/stuff';

export function getSpecificStuff(id: string): Promise<Stuff> {
    let stuffApi = getStuffApi();
    return stuffApi.getSpecificStuff(id);
}
