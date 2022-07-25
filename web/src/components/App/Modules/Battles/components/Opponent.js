import React from "react";
import "./opponent.scss";
import Stats from "../../../Layout/Sidebar/components/Stats";
import Progress from "../../../Components/Progress/Progress";
import { GiBiceps } from "react-icons/gi";
import { RiMagicFill } from "react-icons/ri";
import { BsShieldShaded } from "react-icons/bs";
import { GiMagicPalm } from "react-icons/gi";

const Opponent = ({ bossName, stats, hp, boss }) => {
  return (
    <div className="opponent">
      <img
        src={require(`../../../../../assets/bosses/${boss}.png`)}
        alt="boss"
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
        <Stats
          name="Strength"
          styles="stats-info"
          icon={<GiBiceps style={{ color: "#ff8400" }} />}
          value={stats && Math.round(stats.strength)}
        />
        <Stats
          name="Magic Power"
          styles="stats-info"
          icon={<RiMagicFill style={{ color: "#ad27f5" }} />}
          value={stats && Math.round(stats.magic)}
        />
        <Stats
          name="Armor"
          styles="stats-info"
          icon={<BsShieldShaded style={{ color: "#fff" }} />}
          value={stats && Math.round(stats.armor)}
        />
        <Stats
          name="Magic Resistance"
          styles="stats-info"
          icon={<GiMagicPalm style={{ color: "#006eff" }} />}
          value={stats && Math.round(stats.magicResist)}
        />
      </div>
    </div>
  );
};

export default Opponent;
