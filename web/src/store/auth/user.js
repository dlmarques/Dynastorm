import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            name: '',
            avatar: '',
            strength: null,
            stamina: null,
            magic: null,
            speed: null,
            health: null,
            money: null,
            xp: null,
        }
    }, 
    reducers: {
        setUser(state, action) {
            const user = action.payload;
            if(user){
                state.user.name = user.name
                state.user.avatar = user.avatar
                state.user.strength = user.strength
                state.user.stamina = user.stamina
                state.user.magic = user.magic
                state.user.speed = user.speed
                state.user.health = user.health
                state.user.money = user.money
                state.user.xp = user.xp
            }
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice;