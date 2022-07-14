import { createSlice } from "@reduxjs/toolkit";

const avatarSlice = createSlice({
  name: "avatarsBox",
  initialState: {
    isShown: false,
  },
  reducers: {
    toggle(state) {
      state.isShown = !state.isShown;
    },
  },
});

export const avatarActions = avatarSlice.actions;
export default avatarSlice;
