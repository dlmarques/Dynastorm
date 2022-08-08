import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: {
      title: null,
      message: null,
    },
  },
  reducers: {
    setModal(state, action) {
      const modal = action.payload;
      state.modal = {
        title: modal.title,
        message: modal.message,
      };
    },
    deleteModal(state) {
      state.modal = null;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
