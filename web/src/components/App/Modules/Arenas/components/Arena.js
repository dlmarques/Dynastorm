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
import { convert } from "../../../../../utils/numbersConvert";
import { environment } from "../../../../../environment/environment";
import { toast } from "react-toastify";

const Arena = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const enemy = useSelector((state) => state.enemy.enemy);
  const user = useSelector((state) => state.user.user);

  const startFight = () => {
    if (user.health > 0) {
      const token = sessionStorage.getItem("authToken");
      axios.patch(`${environment.apiUrl}/api/arenas/startFight`, {
        id: enemy.id,
        token: token,
      });
      dispatch(enemyActions.startFight());
      toast.info(`You start a fight against ${enemy.name}`, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      dispatch(
        alertActions.setAlert({ title: "Error", message: "You don't have hp" })
      );
      toast.error(`An error occurred`, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.enemy}>
        {enemy.avatar && (
          <div className={styles.header}>
            <img src={enemy.avatar} alt="enemy avatar" />
            <Progress
              id="hp"
              min="0"
              max="100"
              value={enemy.health}
              styles={styles.hp}
            />
          </div>
        )}
        <h2>{enemy.name && `@${enemy.name}`}</h2>
        {enemy.name && !enemy.fight ? (
          <div className={styles.buttons}>
            <Button btn="arenasBtn" onClick={() => startFight()}>
              Start Fight
            </Button>
            <span>
              <FaInfoCircle
                className={styles.info}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
              />
            </span>

            {isVisible && <Tooltip info="30% of opponent money and 25XP" />}
          </div>
        ) : null}
        {enemy.name && (
          <div className={styles.stats}>
            <h4>Strength: {convert(Math.floor(enemy.strength), 0)}</h4>
            <h4>Armor: {convert(Math.floor(enemy.armor), 0)}</h4>
            <h4>Magic: {convert(Math.floor(enemy.magic), 0)}</h4>
            <h4>Magic Resist: {convert(Math.floor(enemy.magicResist), 0)}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Arena;
