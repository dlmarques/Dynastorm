import { createSlice } from "@reduxjs/toolkit";

const currentChatSlice = createSlice({
  name: "currentChat",
  initialState: {
    user: {},
  },
  reducers: {
    setChat(state, action) {
      state.user = action.payload;
    },
  },
});

export const currentChatActions = currentChatSlice.actions;

export default currentChatSlice;
