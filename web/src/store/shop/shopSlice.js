import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shopSlice",
  initialState: {
    purchased: 1,
    item: {
      name: null,
      price: null,
      percentage: null,
    },
  },
  reducers: {
    buy(state) {
      ++state.purchased;
    },
    sell(state) {
      --state.purchased;
    },
  },
});

export const shopSliceActions = shopSlice.actions;

export default shopSlice;
