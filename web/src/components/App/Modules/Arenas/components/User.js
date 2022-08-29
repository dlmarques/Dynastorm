import React from "react";
import styles from "./user.module.scss";
import { useSelector } from "react-redux";
import { convert } from "../../../../../utils/numbersConvert";
import Progress from "../../../Components/Progress/Progress";

const User = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      {user.name && (
        <div className={styles.user}>
          <div className={styles.header}>
            <img src={user.avatar} alt="boss" />
            <h3>You</h3>
          </div>
          <Progress
            id="hp"
            min="0"
            max="100"
            value={user.health}
            styles={styles.hp}
          />
          <div className={styles.stats}>
            <h4>Strength: {convert(Math.floor(user.strength), 0)}</h4>
            <h4>Armor: {convert(Math.floor(user.armor), 0)}</h4>
            <h4>Magic: {convert(Math.floor(user.magic), 0)}</h4>
            <h4>Magic Resist: {convert(Math.floor(user.magicResist), 0)}</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
