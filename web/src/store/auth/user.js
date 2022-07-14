import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: "",
      avatar: "",
      strength: null,
      stamina: null,
      magic: null,
      speed: null,
      health: null,
      money: null,
      xp: null,
      isNew: null,
      perk: null,
      perkImage: null,
    },
    level: {
      level: null,
      tier: null,
    },
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      if (user) {
        state.user.name = user.name;
        state.user.avatar = user.avatar;
        state.user.strength = user.strength;
        state.user.stamina = user.stamina;
        state.user.magic = user.magic;
        state.user.speed = user.speed;
        state.user.health = user.health;
        state.user.money = user.money;
        state.user.xp = user.xp;
        state.user.isNew = user.isNew;
        state.user.perk = user.perk;
      }
    },
    setLevel(state, action) {
      const level = action.payload;
      if (level) {
        state.level.level = level.level;
        state.level.tier = level.tier;
      }
    },
    welcome(state) {
      state.user.isNew = false;
    },
    setPerkImage(state, action) {
      state.user.perkImage = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
