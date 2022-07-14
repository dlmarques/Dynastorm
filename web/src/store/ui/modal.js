import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpened: false,
  },
  reducers: {
    open(state) {
      state.isOpened = true;
    },
    close(state) {
      state.isOpened = false;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
