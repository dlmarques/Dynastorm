import React from "react";
import styles from "./arenas.module.scss";
import Arena from "./components/Arena";
import PlayersList from "./components/PlayersList";

const Arenas = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.list}>
          <PlayersList />
        </div>
        <div className={styles.arena}>
          <Arena />
        </div>
      </div>
    </div>
  );
};

export default Arenas;
