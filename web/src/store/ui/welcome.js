import { createSlice } from "@reduxjs/toolkit";

const welcomeSlice = createSlice({
  name: "welcome",
  initialState: {
    step: 1,
  },
  reducers: {
    nextStep(state) {
      ++state.step;
    },
  },
});

export const welcomeActions = welcomeSlice.actions;
export default welcomeSlice;
