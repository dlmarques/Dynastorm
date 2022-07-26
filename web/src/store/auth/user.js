import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: "",
      avatar: "",
      strength: null,
      armor: null,
      magic: null,
      magicResist: null,
      health: null,
      money: null,
      xp: null,
      isNew: null,
      perk: null,
      perkImage: null,
      currentBoss: null,
    },
    level: {
      level: null,
      tier: null,
    },
    missions: 0,
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      if (user) {
        state.user.name = user.name;
        state.user.avatar = user.avatar;
        state.user.strength = user.strength;
        state.user.armor = user.armor;
        state.user.magic = user.magic;
        state.user.magicResist = user.magicResist;
        state.user.health = user.health;
        state.user.money = user.money;
        state.user.xp = user.xp;
        state.user.isNew = user.isNew;
        state.user.perk = user.perk;
        state.user.currentBoss = user.currentBoss;
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
    startMission(state) {
      state.missions = ++state.missions;
    },
    endMission(state) {
      state.busy = --state.missions;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
