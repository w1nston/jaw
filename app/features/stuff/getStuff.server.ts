import type { StuffMetadata } from "~/types/stuff";
import { getStuffApi } from "~/libs/apis/stuffApi.server";

export function getStuff(): Promise<StuffMetadata[]> {
  let stuffApi = getStuffApi();
  return stuffApi.getStuff();
}