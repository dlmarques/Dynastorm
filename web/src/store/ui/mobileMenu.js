import {createSlice} from '@reduxjs/toolkit'

const mobileMenuSlice = createSlice({
    name: 'mobileMenu',
    initialState: {
        isOpened: false
    },
    reducers: {
        open(state) {
            state.isOpened = true
        },
        close(state) {
            state.isOpened = false
        },
    }
})

export const mobileMenuActions = mobileMenuSlice.actions;

export default mobileMenuSlice;