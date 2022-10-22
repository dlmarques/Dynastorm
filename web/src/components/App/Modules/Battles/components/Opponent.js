import React from "react";
import "./opponent.scss";
import Progress from "../../../Components/Progress/Progress";
import { convert } from "../../../../../utils/numbersConvert";

const Opponent = ({ bossName, stats, hp, boss, id }) => {
  return (
    <div className="opponent">
      <div className="header">
        <img
          src={require(`../../../../../assets/bosses/${boss}.png`)}
          alt="boss"
        />
        <Progress id="hp" min="0" max="100" value={hp && hp} styles="hp" />
      </div>

      <h3>{bossName && bossName}</h3>

      <div className="stats">
        <h4>Strength: {convert(Math.floor(stats.strength), 0)}</h4>
        <h4>Armor: {convert(Math.floor(stats.armor), 0)}</h4>
        <h4>Magic: {convert(Math.floor(stats.magic), 0)}</h4>
        <h4>Magic Resist: {convert(Math.floor(stats.magicResist), 0)}</h4>
      </div>
    </div>
  );
};

export default Opponent;
