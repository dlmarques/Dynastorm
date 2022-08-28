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
            <h4>Strength: {Math.floor(enemy.strength)}</h4>
            <h4>Armor: {Math.floor(enemy.armor)}</h4>
            <h4>Magic: {Math.floor(enemy.magic)}</h4>
            <h4>Magic Resist: {Math.floor(enemy.magicResist)}</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default Enemy;
