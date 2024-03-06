import request from "umi-request";
import { API_URL, USER_TOKEN, USER_ID } from "../config/config";

export async function getAllUsers() {
  return request(`${API_URL}/user/all`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      // Authorization: USER_TOKEN,
    },
  });
}

export async function getSingleUser(userId) {
  return request(`${API_URL}/user/${userId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      // Authorization: USER_TOKEN,
    },
  });
}
