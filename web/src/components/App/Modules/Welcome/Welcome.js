import React from "react";
import Header from "../../Layout/Topbar/Header";
import styles from "./welcome.module.css";

import skills from '../../../../assets/skills/skills'
import Perk from "./components/Perk";

const Welcome = () => {

  return (
    <>
      <Header title="Dynastorm" />
      <div className={styles["welcome-container"]}>
        <div className={styles.welcome}>
          <h2>Welcome, please select a perk to start</h2>
          <div className={styles['perks-list']}>
          {skills.map((skill, id) =>
            <Perk key={id} image={skill} />
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
