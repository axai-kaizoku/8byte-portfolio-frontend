import type { Sector } from "@/app/(home)/columns";
import { callAPI } from "./helper";
import { env } from "@/env";

const BASEURL = env.NEXT_PUBLIC_BASEURL;

export async function getStockData() {
  const res = await callAPI<Sector>(`${BASEURL}/api/portfolio`, "GET");
  return res;
}
