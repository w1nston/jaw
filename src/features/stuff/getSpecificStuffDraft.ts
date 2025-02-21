import { getStuffApi } from "$lib/apis/stuffApi.server";
import type { Stuff } from "../../types/stuff";

export function getSpecificStuffDraft(id: string): Promise<Stuff> {
    let stuffApi = getStuffApi();
    return stuffApi.getSpecificStuffDraft(id);
}