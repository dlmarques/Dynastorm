import { createSlice } from "@reduxjs/toolkit";

const currentChatSlice = createSlice({
  name: "currentChat",
  initialState: {
    user: {},
    messageSent: 0,
  },
  reducers: {
    setChat(state, action) {
      state.user = action.payload;
    },
    sendMessage(state) {
      ++state.messageSent;
    },
  },
});

export const currentChatActions = currentChatSlice.actions;

export default currentChatSlice;
