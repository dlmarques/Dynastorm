import React from "react";
import "./character.scss";
import { useSelector } from "react-redux";
import Stats from "../../../Layout/Sidebar/components/Stats";
import Progress from "../../../Components/Progress/Progress";
import { GiBiceps } from "react-icons/gi";
import { RiMagicFill } from "react-icons/ri";
import { BsShieldShaded } from "react-icons/bs";
import { GiMagicPalm } from "react-icons/gi";

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
        <Stats
          name="Strength"
          styles="stats-info"
          icon={<GiBiceps style={{ color: "#ff8400" }} />}
          value={user && Math.round(user.strength)}
        />
        <Stats
          name="Magic Power"
          styles="stats-info"
          icon={<RiMagicFill style={{ color: "#ad27f5" }} />}
          value={user && Math.round(user.magic)}
        />
        <Stats
          name="Armor"
          styles="stats-info"
          icon={<BsShieldShaded style={{ color: "#fff" }} />}
          value={user && Math.round(user.armor)}
        />
        <Stats
          name="Magic Resistance"
          styles="stats-info"
          icon={<GiMagicPalm style={{ color: "#006eff" }} />}
          value={user && Math.round(user.magicResist)}
        />
      </div>
    </div>
  );
};

export default Character;
