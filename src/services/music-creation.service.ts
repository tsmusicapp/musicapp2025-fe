import FormData from "@/app/share-work-creation/share-work-creation";
import { getAuthToken } from "@/utils/auth";
import { BASE_URL } from "@/conf/api";

interface MusicCreationData {
  musicName: string;
  myRole: string[];
  singerName?: string;
  publisher?: string;
  songLanguage?: string;
  musicUsage: string[] | string;
  musicStyle: string;
  musicMood?: string;
  musicImage: string;
  music: string;
  musicLyric?: string;
  musicPlaybackBackground?: string;
  musicInstrument?: string;
  tags: string;
  description: string;
  softwareTool?: string;
}

// const BACKEND_URL = `${API_URL}/v1/music-creation`;
const BACKEND_URL = `${BASE_URL}/v1/music-creation`;

export const MusicCreationService = {
  getMusicCreationById: async (id: string) => {
    const token = getAuthToken();
    if (!token) throw new Error("No authentication token found");

    const response = await fetch(`${BACKEND_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch music creation");
    return response.json();
  },

  createMusic: async (data: FormData) => {
    const token = getAuthToken();
    if (!token) throw new Error("No authentication token found");
  
    const response = await fetch(`${BASE_URL}/v1/music/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data as any,
    });
  
    if (!response.ok) throw new Error("Failed to create music");
    return response.json();
  }
};
