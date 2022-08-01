import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: null,
    isVisible: false,
    newNotifications: false,
    read: 0,
  },
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    open(state) {
      state.isVisible = true;
    },
    close(state) {
      state.isVisible = false;
    },
    addNotifications(state) {
      state.newNotifications = true;
    },
    deleteNotifications(state) {
      state.newNotifications = false;
    },
    read(state) {
      ++state.read;
    },
  },
});

export const notificationsActions = notificationsSlice.actions;

export default notificationsSlice;
