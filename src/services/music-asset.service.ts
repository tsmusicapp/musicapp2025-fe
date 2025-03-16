import { getAuthToken } from "@/utils/auth";
import { API_URL } from "@/utils/env_var";

const BACKEND_URL = `${API_URL}/v1/music-asset`;

export const MusicAssetService = {


  getMusicAssetById: async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No authentication token found");

    console.log("Fetching music asset with ID:", id);
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch music asset:", await response.text());
      throw new Error("Failed to fetch music asset");
    }
    console.log(response)
    const data = await response.json();

    return data
  },
  // other methods...
};
