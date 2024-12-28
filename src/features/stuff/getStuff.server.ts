import { getStuffApi } from "$lib/apis/stuffApi.server";
import type { StuffMetadata } from "../../types/stuff";

export function getStuff(): Promise<StuffMetadata[]> {
    let stuffApi = getStuffApi();
    return stuffApi.getStuff();
}