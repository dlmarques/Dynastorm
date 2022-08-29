import React from "react";
import "./character.scss";
import { useSelector } from "react-redux";
import Progress from "../../../Components/Progress/Progress";
import { convert } from "../../../../../utils/numbersConvert";

const Character = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="character">
      <div className="header">
        <Progress
          id="hp"
          min="0"
          max="100"
          value={user && user.health}
          styles="hp"
        />
        <img src={user.avatar} alt="avatar" />
      </div>
      <h3>{user && user.name}</h3>
      <div className="stats">
        <h4>Strength: {convert(Math.floor(user.strength), 0)}</h4>
        <h4>Armor: {convert(Math.floor(user.armor), 0)}</h4>
        <h4>Magic: {convert(Math.floor(user.magic), 0)}</h4>
        <h4>Magic Resist: {convert(Math.floor(user.magicResist), 0)}</h4>
      </div>
    </div>
  );
};

export default Character;
