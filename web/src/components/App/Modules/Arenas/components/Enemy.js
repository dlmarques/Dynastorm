import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./enemy.module.scss";
import { useSelector } from "react-redux";
import Progress from "../../../Components/Progress/Progress";
import Stats from "../../../Layout/Sidebar/components/Stats";
import { GiBiceps } from "react-icons/gi";
import { RiMagicFill } from "react-icons/ri";
import { BsShieldShaded } from "react-icons/bs";
import { GiMagicPalm } from "react-icons/gi";

const Enemy = () => {
  const enemy = useSelector((state) => state.enemy.enemy);
  const reload = useSelector((state) => state.enemy.reload);
  const [opponent, setOpponent] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/arenas/getEnemy", {
        id: enemy.id,
      })
      .then((response) => setOpponent(response.data));
  }, [reload]);

  return (
    <>
      {opponent && (
        <div className={styles.enemy}>
          <img src={opponent.avatar} alt="boss" />
          <h3>@{opponent.username}</h3>
          <Progress
            id="hp"
            min="0"
            max="100"
            value={opponent.hp}
            styles={styles.hp}
          />
          <div className={styles.stats}>
            <Stats
              name="Strength"
              styles={styles["stats-info"]}
              icon={<GiBiceps style={{ color: "#ff8400" }} />}
              value={Math.round(opponent.strength)}
            />
            <Stats
              name="Magic Power"
              styles={styles["stats-info"]}
              icon={<RiMagicFill style={{ color: "#ad27f5" }} />}
              value={Math.round(opponent.magic)}
            />
            <Stats
              name="Armor"
              styles={styles["stats-info"]}
              icon={<BsShieldShaded style={{ color: "#fff" }} />}
              value={Math.round(opponent.armor)}
            />
            <Stats
              name="Magic Resistance"
              styles={styles["stats-info"]}
              icon={<GiMagicPalm style={{ color: "#006eff" }} />}
              value={Math.round(opponent.magicResist)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Enemy;
