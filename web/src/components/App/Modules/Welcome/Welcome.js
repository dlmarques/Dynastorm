import React from "react";
import styles from "./welcome.module.scss";

import skills from "../../../../assets/skills/skills";
import Perk from "./components/Perk";

const Welcome = () => {
  return (
    <>
      <div className={styles["welcome-container"]}>
        {skills && skills.map((skill, id) => <Perk key={id} image={skill} />)}
      </div>
    </>
  );
};

export default Welcome;
