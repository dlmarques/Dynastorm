import { createSlice } from '@reduxjs/toolkit'

const shopSlice = createSlice({
    name: 'shopSlice',
    initialState: {
        purchased: 1,
        item: {
            name: null,
            price: null,
            percentage: null,
        }
    },
    reducers: {
        buy(state) {
            state.purchased++
        },
        setItem(state, action) {
            const item = action.payload
            if(item){
                state.item.name = item.name
                state.item.price = item.price
                state.item.percentage = item.percentage
            }
        },
    }
})

export const shopSliceActions = shopSlice.actions;

export default shopSlice;