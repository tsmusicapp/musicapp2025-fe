import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatUser } from "@/types/chat";

interface ChatUser {
  id: string;
  chatId: string;
  userName: string;
  avatar: string;
  latestMessage: string;
  unreadCount: number;
}

interface ChatState {
  // _id: String;
  chatDrawer: boolean;
  chatId: string;
  recruiterId: string;
  chatUsers: ChatUser[];
}

const initialState: ChatState = {
  chatDrawer: false,
  chatId: "",
  recruiterId: "",
  chatUsers: [],
};

export const chatSlice = createSlice({
  name: "chatDrawer",
  initialState,
  reducers: {
    updateDrawer: (state) => {
      state.chatDrawer = !state.chatDrawer;
    },
    chatId: (state, action: PayloadAction<string>) => {
      state.chatId = action.payload;
    },
    updateChatUsers: (state, action: PayloadAction<ChatUser[]>) => {
      state.chatUsers = [...action.payload];
    },
    recruiterId: (state, action: PayloadAction<string>) => {
      state.recruiterId = action.payload;
    },
  },
});

export const { updateDrawer, chatId, updateChatUsers, recruiterId } = chatSlice.actions;
export default chatSlice.reducer;
