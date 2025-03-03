// src/services/chatService.ts
import { IChatUser, IChatRoom, IMessage } from "../types/chat";
import { updateChatUsers } from "../redux/features/chat/chatSlice";

const BASE_URL = "http://localhost:5000/v1";

export const chatService = {
  async getChatUsers(role: string): Promise<IChatUser[]> {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/chat-system/users/${role}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat users");
      }

      const users = await response.json();
      return users.data
    } catch (error) {
      console.error("Error fetching chat users:", error);
      throw error;
    }
  },

  async getChatMessages(currentUserId: string, chatId: string): Promise<> {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/chat-system/history/${chatId}?currentUserId=${currentUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch chat messages");
      }

      const message = await response.json();
      console.log(message , "message here")
      return message.data
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      throw error;
    }
  },

  async sendMessage(chatId: string, message: string): Promise<IMessage> {
    try {
      const token = localStorage.getItem("token");
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      const currentUser = auth.user;

      const response = await fetch(
        `${BASE_URL}/chat-system/${chatId}/messages?senderId=${currentUser?.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  startPolling(dispatch: any, interval = 3000) {
    return setInterval(async () => {
      try {
        const users = await this.getChatUsers();
        dispatch(updateChatUsers(users));
      } catch (error) {
        console.error("Error polling chat users:", error);
      }
    }, interval);
  },

  stopPolling(intervalId: NodeJS.Timeout) {
    clearInterval(intervalId);
  },
};
