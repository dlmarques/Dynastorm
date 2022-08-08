import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alert: {
      title: null,
      message: null,
    },
  },
  reducers: {
    setAlert(state, action) {
      const alert = action.payload;
      state.alert = {
        title: alert.title,
        message: alert.message,
      };
    },
    deleteAlert(state) {
      state.alert = {
        title: null,
        message: null,
      };
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
