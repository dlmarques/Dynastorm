import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./arenas.module.scss";
import Arena from "./components/Arena";
import Enemy from "./components/Enemy";
import Mid from "./components/Mid";
import PlayersList from "./components/PlayersList";
import User from "./components/User";
import { BiArrowToLeft } from "react-icons/bi";
import { enemyActions } from "../../../../store/auth/enemy";

const Arenas = () => {
  const dispatch = useDispatch();
  const enemy = useSelector((state) => state.enemy.enemy);

  const stopFight = () => dispatch(enemyActions.stopFight());
  useEffect(() => {
    return () => {
      dispatch(enemyActions.cleanEnemy());
    };
  }, []);
  return (
    <div className={styles.container}>
      {enemy.fight ? (
        <div className={styles.fight}>
          <BiArrowToLeft className={styles.exit} onClick={() => stopFight} />
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
