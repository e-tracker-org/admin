import axios from "axios";
import { API_URL } from "config/config";

export async function getKycForApproval() {
  try {
    const response = await axios.get(`${API_URL}/kyc/for-approval`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        //   'Authorization': USER_TOKEN,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching KYC for approval:", error);
    throw error;
  }
}

export async function getAllKyc() {
  try {
    const response = await axios.get(`${API_URL}/kyc/all`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    });

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching KYC for approval:", error);
    throw error;
  }
}

export async function approveKyc(status, kycId) {
  try {
    const response = await axios.post(
      `${API_URL}/kyc/status/${status}/${kycId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("Something went wrong:", error);
    throw error;
  }
}
