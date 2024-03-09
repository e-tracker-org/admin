import axios from "axios";
import { API_URL, USER_TOKEN, USER_ID } from "../config/config";

export async function getAllUsers() {
  try {
    const response = await axios.get(`${API_URL}/user/all`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        // Authorization: USER_TOKEN,
      },
    });

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching all users:", error);
    throw error;
  }
}

export async function getSingleUser(userId) {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        // Authorization: USER_TOKEN,
      },
    });

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching single user:", error);
    throw error;
  }
}
