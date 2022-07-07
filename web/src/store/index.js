import {configureStore} from '@reduxjs/toolkit'

import authSlice from './auth/auth'
import userSlice from './auth/user';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
    }
})

export default store;