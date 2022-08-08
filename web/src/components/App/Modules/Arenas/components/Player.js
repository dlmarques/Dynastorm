import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./player.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLevel } from "../../../../../utils/Level";
import { enemyActions } from "../../../../../store/auth/enemy";
import { alertActions } from "../../../../../store/ui/alert";

const Player = ({ name, xp, avatar, id }) => {
  const dispatch = useDispatch();
  const [playerLevel, setPlayerLevel] = useState();
  const reload = useSelector((state) => state.enemy.reload);
  const enemy = useSelector((state) => state.enemy.enemy);
  const [busy, setBusy] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/user/checkBusy", {
        token: token,
      })
      .then((response) => setBusy(response.data));
  }, [enemy.fight]);

  useEffect(() => {
    setPlayerLevel(setLevel(xp));
    setTimeout(() => {
      axios
        .post("http://localhost:3001/api/arenas/getEnemy", {
          id: id,
        })
        .then((response) => dispatch(enemyActions.setHp(response.data.hp)));
    }, 1000);
  }, [reload]);

  const selectEnemy = () => {
    if (!busy) {
      axios
        .post("http://localhost:3001/api/arenas/getEnemy", {
          id: id,
        })
        .then((response) =>
          dispatch(
            enemyActions.setEnemy({
              id: response.data._id,
              name: response.data.username,
              avatar: response.data.avatar,
              strength: response.data.strength,
              armor: response.data.armor,
              magic: response.data.magic,
              magicResist: response.data.magicResist,
              health: response.data.hp,
              xp: response.data.xp,
              perk: response.data.perk,
              perkImage: response.data.perkImage,
              level: playerLevel,
            })
          )
        );
    } else {
      dispatch(
        alertActions.setAlert({
          title: "Error",
          message: "You are busy, finish all pending tasks",
        })
      );
    }
  };

  return (
    <div className={styles.player} onClick={selectEnemy}>
      <img src={avatar} alt="avatar" />
      <div className={styles.text}>
        <h2>{name}</h2>
        <h3>{playerLevel && `Level ${playerLevel}`}</h3>
      </div>
    </div>
  );
};

export default Player;
