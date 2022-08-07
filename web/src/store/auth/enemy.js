import { createSlice } from "@reduxjs/toolkit";

const enemySlice = createSlice({
  name: "enemy",
  initialState: {
    enemy: {
      id: null,
      name: "",
      avatar: "",
      strength: null,
      armor: null,
      magic: null,
      magicResist: null,
      health: null,
      xp: null,
      perk: null,
      perkImage: null,
      level: null,
      fight: false,
    },
    reload: 0,
    result: "",
  },
  reducers: {
    setEnemy(state, action) {
      const enemy = action.payload;
      state.enemy = {
        id: enemy.id,
        name: enemy.name,
        avatar: enemy.avatar,
        strength: enemy.strength,
        armor: enemy.armor,
        magic: enemy.magic,
        magicResist: enemy.magicResist,
        health: enemy.health,
        xp: enemy.xp,
        perk: enemy.perk,
        perkImage: enemy.perkImage,
        level: enemy.level,
      };
    },
    cleanEnemy(state) {
      state.enemy = {
        id: null,
        name: "",
        avatar: "",
        strength: null,
        armor: null,
        magic: null,
        magicResist: null,
        health: null,
        xp: null,
        perk: null,
        perkImage: null,
        level: null,
        fight: false,
      };
    },
    startFight(state) {
      state.enemy.fight = true;
    },
    stopFight(state) {
      state.enemy.fight = false;
    },
    setHp(state, action) {
      state.enemy.health = action.payload;
    },
    reload(state) {
      ++state.reload;
    },
    setResult(state, action) {
      state.result = action.payload;
    },
  },
});

export const enemyActions = enemySlice.actions;

export default enemySlice;
