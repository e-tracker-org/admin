import axios from "axios";
import { API_URL } from "../config/config";

export async function getAllProperty() {
  try {
    const response = await axios.get(`${API_URL}/properties`, {
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
