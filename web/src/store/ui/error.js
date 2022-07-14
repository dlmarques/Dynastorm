import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "errorUI",
  initialState: {
    error: null,
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    deleteError(state) {
      state.error = null;
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice;
