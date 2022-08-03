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
    },
    fight: 0,
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
    fight(state) {
      ++state.fight;
    },
    setHp(state, action) {
      state.enemy.health = action.payload;
    },
  },
});

export const enemyActions = enemySlice.actions;

export default enemySlice;
