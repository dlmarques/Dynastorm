import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alert: {
      title: null,
      message: null,
      confirm: false,
      confirmed: false,
    },
  },
  reducers: {
    setAlert(state, action) {
      const alert = action.payload;
      state.alert = {
        title: alert.title,
        message: alert.message,
        confirm: alert.confirm,
        request: alert.request,
      };
    },
    deleteAlert(state) {
      state.alert = {
        title: null,
        message: null,
      };
    },
    confirm(state) {
      state.alert = {
        confirmed: true,
      };
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
