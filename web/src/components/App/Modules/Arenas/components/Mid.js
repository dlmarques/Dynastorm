import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styles from "./mid.module.scss";
import { enemyActions } from "../../../../../store/auth/enemy";
import { errorActions } from "../../../../../store/ui/error";

const Mid = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const enemy = useSelector((state) => state.enemy.enemy);

  const attack = async (attack) => {
    const token = localStorage.getItem("authToken");
    setStatus(true);
    axios
      .patch("http://localhost:3001/api/arenas/attackEnemy", {
        token: token,
        id: enemy.id,
        attack: attack,
      })
      .then((response) => console.log(response.data));
    setTimeout(() => {
      axios
        .patch("http://localhost:3001/api/arenas/counterAttack", {
          token: token,
          id: enemy.id,
          attack: attack,
        })
        .then((response) => {
          if (response.data.includes("win")) {
            dispatch(errorActions.setError(response.data));
            dispatch(enemyActions.cleanEnemy());
            dispatch(enemyActions.stopFight());
          }
        });
    }, 1000);

    setTimeout(() => {
      setStatus(false);
      dispatch(enemyActions.reload());
    }, 2000);
  };

  return (
    <div className={styles.mid}>
      <button onClick={() => attack("magic")} disabled={status}>
        Magic Attack
      </button>
      <button onClick={() => attack("physical")} disabled={status}>
        Physical Attack
      </button>
    </div>
  );
};

export default Mid;
