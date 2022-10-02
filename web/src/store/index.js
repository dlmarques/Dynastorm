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
import currentChatSlice from "./chat/currentChat";
import currentSenderSlice from "./chat/currentSender";
import welcomeSlice from "./ui/welcome";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    bosses: bossSlice.reducer,
    alert: alertSlice.reducer,
    modal: modalSlice.reducer,
    welcome: welcomeSlice.reducer,
    avatars: avatarSlice.reducer,
    mobileMenu: mobileMenu.reducer,
    shop: shopSlice.reducer,
    battles: battlesSlice.reducer,
    notifications: notificationsSlice.reducer,
    enemy: enemySlice.reducer,
    chat: currentChatSlice.reducer,
    sender: currentSenderSlice.reducer,
  },
});

export default store;
