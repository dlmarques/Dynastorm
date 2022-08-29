import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./enemy.module.scss";
import { useSelector } from "react-redux";
import Progress from "../../../Components/Progress/Progress";
import { convert } from "../../../../../utils/numbersConvert";

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
          <div className={styles.header}>
            <img src={opponent.avatar} alt="boss" />
            <h3>@{opponent.username}</h3>
          </div>
          <Progress
            id="hp"
            min="0"
            max="100"
            value={opponent.hp}
            styles={styles.hp}
          />
          <div className={styles.stats}>
            <h4>Strength: {convert(Math.floor(enemy.strength), 0)}</h4>
            <h4>Armor: {convert(Math.floor(enemy.armor), 0)}</h4>
            <h4>Magic: {convert(Math.floor(enemy.magic), 0)}</h4>
            <h4>Magic Resist: {convert(Math.floor(enemy.magicResist), 0)}</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default Enemy;
