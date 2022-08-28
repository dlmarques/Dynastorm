import React from "react";
import "./character.scss";
import { useSelector } from "react-redux";
import Progress from "../../../Components/Progress/Progress";

const Character = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="character">
      <img src={user.avatar} alt="avatar" />
      <h3>{user && user.name}</h3>
      <Progress
        label="HP"
        id="hp"
        min="0"
        max="100"
        value={user && user.health}
        styles="hp"
      />
      <div className="stats">
        <h4>Strength: {user.strength}</h4>
        <h4>Armor: {user.armor}</h4>
        <h4>Magic: {user.magic}</h4>
        <h4>Magic Resist: {user.magicResist}</h4>
      </div>
    </div>
  );
};

export default Character;
