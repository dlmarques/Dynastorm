import {configureStore} from '@reduxjs/toolkit'

import authSlice from './auth/auth'
import userSlice from './auth/user';
import avatarSlice from './ui/avatars';
import errorSlice from './ui/error';
import mobileMenu from './ui/mobileMenu';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        error: errorSlice.reducer,
        avatars: avatarSlice.reducer,
        mobileMenu: mobileMenu.reducer,
    }
})

export default store;