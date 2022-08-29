import React from "react";
import styles from "./home.module.scss";
import { useSelector } from "react-redux";
import Progress from "../../Components/Progress/Progress";
import { convert } from "../../../../utils/numbersConvert";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className={styles["home-container"]}>
      <h1>Welcome back {user && user.name}</h1>
      <div className={styles.content}>
        <div className={styles.col}>
          <div className={styles.user}>
            <img src={user.avatar} alt="avatar" />
            <p>@{user.name}</p>
            <Progress
              stat="hp"
              id="hp"
              min="0"
              max="100"
              value={user && user.health}
              styles={styles.hp}
            />
            <p>
              $<strong> {Math.floor(user.money)}</strong>
            </p>

            <div className={styles.grid}>
              <p>
                Strength <br />
                <strong> {convert(Math.floor(user.strength), 0)}</strong>
              </p>
              <p>
                Magic <br />
                <strong> {convert(Math.floor(user.magic), 0)}</strong>
              </p>
              <p>
                M. Resist <br />
                <strong> {convert(Math.floor(user.magicResist), 0)}</strong>
              </p>
              <p>
                Armor <br />
                <strong> {convert(Math.floor(user.armor), 0)}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
