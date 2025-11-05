import { BASEURL, callAPI } from "./helper";

export async function fetchUsers() {
  const res = await callAPI<unknown>(BASEURL + "", "GET");
  return res;
}

export async function getStockData() {
  const res = await callAPI<unknown>("http://localhost:8080/api/portfolio", "GET");
  return res;
}
