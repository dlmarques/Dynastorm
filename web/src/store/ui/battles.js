import { createSlice } from "@reduxjs/toolkit";

const battlesSlice = createSlice({
  name: "battles",
  initialState: {
    isActive: false,
    status: "",
  },
  reducers: {
    setIsActive(state) {
      state.isActive = !state.isActive;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const battlesActions = battlesSlice.actions;

export default battlesSlice;
