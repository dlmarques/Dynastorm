import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/auth";
import userSlice from "./auth/user";
import shopSlice from "./shop/shopSlice";
import avatarSlice from "./ui/avatars";
import modalSlice from "./ui/modal";
import errorSlice from "./ui/error";
import mobileMenu from "./ui/mobileMenu";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    error: errorSlice.reducer,
    modal: modalSlice.reducer,
    avatars: avatarSlice.reducer,
    mobileMenu: mobileMenu.reducer,
    shop: shopSlice.reducer,
  },
});

export default store;
