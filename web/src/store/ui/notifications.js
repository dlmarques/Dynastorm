import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    isVisible: false,
  },
  reducers: {
    open(state) {
      state.isVisible = true;
    },
    close(state) {
      state.isVisible = false;
    },
  },
});

export const notificationsActions = notificationsSlice.actions;

export default notificationsSlice;
