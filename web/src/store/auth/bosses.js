import { createSlice } from "@reduxjs/toolkit";

const bosses = [];

const bossSlice = createSlice({
  name: "boss",
  initialState: { bosses },
  reducers: {
    addBosses(state, action) {
      state.bosses.push({
        boss: action.payload.boss,
        bossName: action.payload.bossName,
        strength: action.payload.strength,
        armor: action.payload.armor,
        magic: action.payload.magic,
        magicResist: action.payload.magicResist,
        hp: action.payload.hp,
      });
    },
  },
});

export const bossActions = bossSlice.actions;
export default bossSlice;
