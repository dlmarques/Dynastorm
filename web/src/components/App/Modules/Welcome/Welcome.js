import React from "react";
import styles from "./welcome.module.scss";

import skills from "../../../../assets/skills/skills";
import Perk from "./components/Perk";
import { welcomeActions } from "../../../../store/ui/welcome";
import { useDispatch, useSelector } from "react-redux";
import { GiWideArrowDunk } from "react-icons/gi";

const Welcome = () => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.welcome.step);
  const user = useSelector((state) => state.user.user);

  const nextStep = () => dispatch(welcomeActions.nextStep());

  return (
    <>
      {step === 1 ? (
        <div className={styles["welcome-container"]}>
          <div className={styles["host"]}>
            <div className={styles.text}>
              <img
                src={require("../../../../assets/avatars/img/35.png")}
                alt="welcome"
              />
              <h3>
                Hello {user && user.name}, I'm the Omenia village host, here you
                can fight, evolve to dominate and conquest omenia, but be
                careful there are other warriors that want the same. The current
                leader have much people defend him, at any moment you can find
                one of them.
              </h3>
            </div>

            <div className={styles.nextArrow}>
              <GiWideArrowDunk onClick={nextStep} />
            </div>
          </div>
        </div>
      ) : step === 2 ? (
        <>
          <div className={styles["welcome-container"]}>
            <div className={styles.content}>
              <h1>Choose a perk to start</h1>
              <div className={styles.skills}>
                {skills &&
                  skills.map((skill, id) => <Perk key={id} image={skill} />)}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Welcome;
