import { API_URL } from "config/config";
import request from "umi-request";

export async function loginUser(credentials) {
  return request(`${API_URL}/auth/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Aceess-Control-Allow-Origin": "*",
      "Acees-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(credentials),
  });
}
