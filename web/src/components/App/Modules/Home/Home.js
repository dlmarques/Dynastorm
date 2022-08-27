import React from "react";
import styles from "./home.module.scss";
import { useSelector } from "react-redux";
import Level from "./components/Level";
import PerkImage from "../../Components/PerkImage/PerkImage";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className={styles["home-container"]}>
      <h1>Welcome back {user && user.name}</h1>
      <div className={styles.row}>
        <Level />
        <PerkImage
          styles={styles["img-container"]}
          imageStyle={styles.perkImage}
          user={user}
        />
      </div>
      <div className={styles.row}></div>
    </div>
  );
};

export default Home;
