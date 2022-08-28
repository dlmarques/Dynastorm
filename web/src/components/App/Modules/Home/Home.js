import React from "react";
import styles from "./home.module.scss";
import { useSelector } from "react-redux";
import Level from "./components/Level";
import PerkImage from "../../Components/PerkImage/PerkImage";
import Progress from "../../Components/Progress/Progress";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className={styles["home-container"]}>
      <h1>Welcome back {user && user.name}</h1>
      <div className={styles.content}>
        <div className={styles.col1}>
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
            <div className={styles.grid}>
              <p>
                Strength <br />
                {Math.floor(user.strength)}
              </p>
              <p>
                Magic <br />
                {Math.floor(user.magic)}
              </p>
              <p>
                Magic Resist <br />
                {Math.floor(user.magicResist)}
              </p>
              <p>
                Armor <br />
                {Math.floor(user.armor)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.col2}>
          <Level />
          <PerkImage
            styles={styles["img-container"]}
            imageStyle={styles.perkImage}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
