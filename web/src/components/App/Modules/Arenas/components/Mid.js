import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "./mid.module.scss";
import { enemyActions } from "../../../../../store/auth/enemy";
import { alertActions } from "../../../../../store/ui/alert";
import { environment } from "../../../../../environment/environment";

const Mid = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const enemy = useSelector((state) => state.enemy.enemy);

  const attack = async (attack) => {
    const token = sessionStorage.getItem("authToken");
    setStatus(true);
    axios
      .patch(`${environment.apiUrl}/api/arenas/attackEnemy`, {
        token: token,
        id: enemy.id,
        attack: attack,
      })
      .then((response) => response.data);
    setTimeout(() => {
      axios
        .patch(`${environment.apiUrl}/api/arenas/counterAttack`, {
          token: token,
          id: enemy.id,
          attack: attack,
        })
        .then((response) => {
          if (response.data.includes("win")) {
            dispatch(
              alertActions.setAlert({ title: "Arenas", message: response.data })
            );
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
