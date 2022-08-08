import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GiBiceps } from "react-icons/gi";
import { RiMagicFill } from "react-icons/ri";
import { BsShieldShaded } from "react-icons/bs";
import { GiMagicPalm } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import { enemyActions } from "../../../../../store/auth/enemy";
import { alertActions } from "../../../../../store/ui/alert";
import Stats from "../../../Layout/Sidebar/components/Stats";
import styles from "./arena.module.scss";
import Progress from "../../../Components/Progress/Progress";
import Button from "../../../Components/Button/Button";
import Tooltip from "../../../Components/Tooltip/Tooltip";

const Arena = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const enemy = useSelector((state) => state.enemy.enemy);
  const user = useSelector((state) => state.user.user);

  const startFight = () => {
    if (user.health > 0) {
      const token = localStorage.getItem("authToken");
      axios.patch("http://localhost:3001/api/arenas/startFight", {
        id: enemy.id,
        token: token,
      });
      dispatch(enemyActions.startFight());
    } else {
      dispatch(
        alertActions.setAlert({ title: "Error", message: "You don't have hp" })
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.enemy}>
        {enemy.avatar && <img src={enemy.avatar} alt="enemy avatar" />}
        <h2>{enemy.name && `@${enemy.name}`}</h2>
        {enemy.name && (
          <Progress
            id="hp"
            min="0"
            max="100"
            value={enemy.health}
            styles={styles.hp}
          />
        )}
        <div className={styles.stats}>
          {enemy.strength && (
            <Stats
              name="Strength"
              styles={styles["stats-info"]}
              icon={<GiBiceps style={{ color: "#ff8400" }} />}
              value={Math.round(enemy.strength)}
            />
          )}
          {enemy.magic && (
            <Stats
              name="Magic Power"
              styles={styles["stats-info"]}
              icon={<RiMagicFill style={{ color: "#ad27f5" }} />}
              value={Math.round(enemy.magic)}
            />
          )}
          {enemy.armor && (
            <Stats
              name="Armor"
              styles={styles["stats-info"]}
              icon={<BsShieldShaded style={{ color: "#fff" }} />}
              value={Math.round(enemy.armor)}
            />
          )}
          {enemy.magicResist && (
            <Stats
              name="Magic Resistance"
              styles={styles["stats-info"]}
              icon={<GiMagicPalm style={{ color: "#006eff" }} />}
              value={Math.round(enemy.magicResist)}
            />
          )}
        </div>
        {enemy.name && !enemy.fight ? (
          <div className={styles.buttons}>
            {" "}
            <Button btn="arenasBtn" onClick={startFight}>
              Start Fight
            </Button>
            <FaInfoCircle
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
            />
            {isVisible && <Tooltip info="30% of opponent money and 25XP" />}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Arena;
