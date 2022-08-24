import { createSlice } from "@reduxjs/toolkit";

const currentChatSlice = createSlice({
  name: "currentChat",
  initialState: {
    user: {
      name: "",
      id: "",
    },
  },
  reducers: {
    setChat(state, action) {
      const currentUser = action.payload;
      state.user = {
        name: currentUser.name,
        id: currentUser.id,
      };
    },
  },
});

export const currentChatActions = currentChatSlice.actions;

export default currentChatSlice;
