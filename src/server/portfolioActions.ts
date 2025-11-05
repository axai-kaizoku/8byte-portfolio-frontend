import { BASEURL, callAPI } from "./helper";

export async function fetchUsers() {
  const res = await callAPI<unknown>(BASEURL + "", "GET");
  return res;
}

export async function getStockData() {
  const res = await callAPI<unknown>(`${BASEURL}/api/portfolio`, "GET");
  console.log(res);
  return res;
}
