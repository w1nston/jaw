import type { Stuff } from "~/types/stuff";
import { getStuffApi } from "~/libs/apis/stuffApi.server";

export function getSpecificStuff(id: string): Promise<Stuff> {
  let stuffApi = getStuffApi();
  return stuffApi.getSpecificStuff(id);
}