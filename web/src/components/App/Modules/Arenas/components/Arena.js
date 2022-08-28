import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "./arena.module.scss";
import { FaInfoCircle } from "react-icons/fa";
import { enemyActions } from "../../../../../store/auth/enemy";
import { alertActions } from "../../../../../store/ui/alert";
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
        {enemy.name && !enemy.fight ? (
          <div className={styles.buttons}>
            <Button btn="arenasBtn" onClick={startFight}>
              Start Fight
            </Button>
            <FaInfoCircle
              className={styles.info}
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
            />
            {isVisible && <Tooltip info="30% of opponent money and 25XP" />}
          </div>
        ) : null}
        {enemy.name && (
          <div className={styles.stats}>
            <h4>Strength: {Math.floor(enemy.strength)}</h4>
            <h4>Armor: {Math.floor(enemy.armor)}</h4>
            <h4>Magic: {Math.floor(enemy.magic)}</h4>
            <h4>Magic Resist: {Math.floor(enemy.magicResist)}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Arena;
