import React from "react";
import { useSelector } from "react-redux";
import styles from "./arenas.module.scss";
import Arena from "./components/Arena";
import Enemy from "./components/Enemy";
import Mid from "./components/Mid";
import PlayersList from "./components/PlayersList";
import User from "./components/User";

const Arenas = () => {
  const enemy = useSelector((state) => state.enemy.enemy);
  return (
    <div className={styles.container}>
      {enemy.fight ? (
        <div className={styles.fight}>
          <Enemy />
          <Mid />
          <User />
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.list}>
            <PlayersList />
          </div>
          <div className={styles.arena}>
            <Arena />
          </div>
        </div>
      )}
    </div>
  );
};

export default Arenas;
