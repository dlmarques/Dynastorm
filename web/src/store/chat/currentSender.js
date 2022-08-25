import { createSlice } from "@reduxjs/toolkit";

const currentSenderSlice = createSlice({
  name: "currentChat",
  initialState: {
    sender: {},
  },
  reducers: {
    setSender(state, action) {
      state.sender = action.payload;
    },
  },
});

export const currentSenderActions = currentSenderSlice.actions;

export default currentSenderSlice;
