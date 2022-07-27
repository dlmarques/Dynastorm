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
      busy: false,
    },
    level: {
      level: null,
      tier: null,
    },
    missions: 0,
    battles: 0,
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
    defeatBoss(state) {
      ++state.user.currentBoss;
    },
    battle(state) {
      ++state.battles;
    },
    setBusy(state) {
      state.user.busy = true;
    },
    stopBusy(state) {
      state.user.busy = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
