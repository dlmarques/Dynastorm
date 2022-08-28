import React from "react";
import "./opponent.scss";
import Progress from "../../../Components/Progress/Progress";

const Opponent = ({ bossName, stats, hp, boss, id }) => {
  return (
    <div className="opponent">
      <img
        src={require(`../../../../../assets/bosses/${boss}.png`)}
        alt="boss"
        onClick={() => console.log(id)}
      />
      <h3>{bossName && bossName}</h3>
      <Progress
        label="HP"
        id="hp"
        min="0"
        max="100"
        value={hp && hp}
        styles="hp"
      />
      <div className="stats">
        <h4>Strength: {stats.strength}</h4>
        <h4>Armor: {stats.armor}</h4>
        <h4>Magic: {stats.magic}</h4>
        <h4>Magic Resist: {stats.magicResist}</h4>
      </div>
    </div>
  );
};

export default Opponent;
