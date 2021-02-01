import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    name: null,
    chatImage: null,
  },
  reducers: {
    setChatInfo: (state, action) => {
      state.chatId = action.payload.chatId;
      state.name = action.payload.name;
      state.chatImage = action.payload.chatImage;
    },
  },
});

export const { setChatInfo } = chatSlice.actions;

export const selectChatId = (state) => state.chat.chatId;
export const selectChatName = (state) => state.chat.name;
export const selectChatImage = (state) => state.chat.chatImage;

export default chatSlice.reducer;
