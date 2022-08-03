import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { GiBiceps } from "react-icons/gi";
import { RiMagicFill } from "react-icons/ri";
import { BsShieldShaded } from "react-icons/bs";
import { GiMagicPalm } from "react-icons/gi";
import Stats from "../../../Layout/Sidebar/components/Stats";
import styles from "./arena.module.scss";
import Progress from "../../../Components/Progress/Progress";
import Button from "../../../Components/Button/Button";

const Arena = () => {
  const [result, setResult] = useState();
  const enemy = useSelector((state) => state.enemy.enemy);

  const attackEnemy = () => {
    const token = localStorage.getItem("authToken");
    axios
      .post("http://localhost:3001/api/arenas/attackEnemy", {
        id: enemy.id,
        token: token,
      })
      .then((response) => {
        setResult("waiting");
        setTimeout(() => {
          setResult(response.data === "user win" ? "win" : "lose");
        }, 2000);
        setTimeout(() => {
          setResult("");
        }, 4000);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.enemy}>
        {enemy.avatar && <img src={enemy.avatar} alt="enemy avatar" />}
        <h2>{enemy.name && `@${enemy.name}`}</h2>
        {enemy.health && (
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
        {enemy.name && (
          <Button
            btn={
              result === "win"
                ? "arenasBtn-win"
                : result === "lose"
                ? "arenasBtn-lose"
                : result === "waiting"
                ? "arenasBtn-wait"
                : "arenasBtn"
            }
            onClick={attackEnemy}
          >
            {result === "win"
              ? "You win"
              : result === "lose"
              ? "You lose"
              : result === "waiting"
              ? "Wait..."
              : "Attack!"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Arena;
