import React from "react";
import styles from "./healer.module.scss";
import healer from "../../../../assets/avatars/img/40.png";
import HealerItem from "./components/HealerItem";
import { food } from "../../../../assets/food/food";
import CountdownTimer from "./components/CountdownTimer";

const Healer = () => {
  return (
    <div className={styles["healer-container"]}>
      <h2>Healer</h2>
      <div className={styles["healer-info"]}>
        <img src={healer} className={styles.healer} alt="healer" />
        <h3>
          Hi, I'm the Healer of the Dynastorm Village, here you can find some
          food to regenerate your HP, or you can wait until the next day.
          <CountdownTimer />
        </h3>
      </div>
      <div className={styles["list"]}>
        {food &&
          food.map((food, id) => <HealerItem key={id} id={id} img={food} />)}
      </div>
    </div>
  );
};

export default Healer;
