import React from "react";
import styles from "./battles.module.scss";
import Character from "./components/Character";
import Opponent from "./components/Opponent";
import Button from "../../Components/Button/Button";
import { useSelector } from "react-redux";

const Battles = () => {
  const bosses = useSelector((state) => state.bosses.bosses);
  const currentBoss = useSelector((state) => state.user.currentBoss);
  return (
    <div className={styles["battles-container"]}>
      <h1>Battles</h1>
      <div className={styles.content}>
        {bosses &&
          bosses
            .filter((boss) => boss.boss === currentBoss)
            .map((boss, id) => (
              <Opponent
                key={id}
                boss={boss.boss}
                bossName={boss.bossName}
                stats={{
                  strength: boss.strength,
                  magic: boss.magic,
                  armor: boss.armor,
                  magicResist: boss.magicResist,
                }}
                hp={boss.hp}
              />
            ))}
        <Button btn="btnBattle">Fight!</Button>
        <Character />
      </div>
    </div>
  );
};

export default Battles;
