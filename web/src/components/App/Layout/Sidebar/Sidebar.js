import React from "react";
import styles from "./sidebar.module.css";
import { GiBiceps } from "react-icons/gi";
import { RiMagicFill } from "react-icons/ri";
import { BsLightningFill } from "react-icons/bs";
import { GiTabiBoot } from "react-icons/gi";
import { logout } from "../../../../store/auth/thunk";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../Components/Button/Button";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const endSession = () => {
    logout(dispatch);
  };

  return (
    <div className={styles["profile-bar"]}>
      <div className={styles.profile}>
        <img src={user.avatar} alt="avatar profile bar" />
        <h3>@{user.name}</h3>
      </div>
      <div className={styles.bars}>
        <progress
          id="hp"
          min="0"
          max="100"
          value={user.health}
          className={styles.hp}
        />
        <progress
          id="xp"
          min="0"
          max="100"
          value={user.xp}
          className={styles.xp}
        />
      </div>
      <div className={styles.stats}>
        <div className={styles.row}>
          <span className={styles["stats-info"]}>
            <GiBiceps style={{color: '#ff8400'}}/>
            <strong>{user.strength}</strong>
          </span>
          <span className={styles["stats-info"]}>
            <RiMagicFill style={{color: '#ad27f5'}} />
            <strong>{user.magic}</strong>
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles["stats-info"]}>
            <BsLightningFill style={{color: 'yellow'}}/>
            <strong>{user.stamina}</strong>
          </span>
          <span className={styles["stats-info"]}>
            <GiTabiBoot style={{color: '#006eff'}} />
            <strong>{user.speed}</strong>
          </span>
        </div>
      </div>
      <div className={styles.logout}>
        <Button onClick={endSession}>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;
