import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/auth";
import userSlice from "./auth/user";
import shopSlice from "./shop/shopSlice";
import avatarSlice from "./ui/avatars";
import modalSlice from "./ui/modal";
import alertSlice from "./ui/alert";
import mobileMenu from "./ui/mobileMenu";
import bossSlice from "./auth/bosses";
import battlesSlice from "./ui/battles";
import notificationsSlice from "./ui/notifications";
import enemySlice from "./auth/enemy";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    bosses: bossSlice.reducer,
    alert: alertSlice.reducer,
    modal: modalSlice.reducer,
    avatars: avatarSlice.reducer,
    mobileMenu: mobileMenu.reducer,
    shop: shopSlice.reducer,
    battles: battlesSlice.reducer,
    notifications: notificationsSlice.reducer,
    enemy: enemySlice.reducer,
  },
});

export default store;
