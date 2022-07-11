import React, { useEffect } from "react";
import styles from "./sidebar.module.css";
import { GiBiceps } from "react-icons/gi";
import { RiMagicFill } from "react-icons/ri";
import { BsLightningFill } from "react-icons/bs";
import { GiTabiBoot } from "react-icons/gi";
import { logout } from "../../../../store/auth/thunk";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../Components/Button/Button";

import strength from '../../../../assets/skills/strength.png'
import magic from '../../../../assets/skills/magic.png'
import speed from '../../../../assets/skills/speed.png'


const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const endSession = () => {
    logout(dispatch);
  };

  return (
    <div className={styles["profile-bar"]}>
      <div className={styles.profile}>
        <img src={user && user.avatar} alt="avatar profile bar" className={styles.avatar} />
        <span className={styles['profile-text']}>
        <h3>@{user && user.name}</h3>
        {user &&
       user && user.perkImage === 'strength' ?
        <img src={strength} alt="perkImage" className={styles.perkImage}/>
        :
        user && user.perkImage === 'magic' ?
        <img src={magic} alt="perkImage" className={styles.perkImage}/>
        :
        <img src={speed} alt="perkImage" className={styles.perkImage}/>
        }
        </span>
      </div>
      <div className={styles.bars}>
        <label>HP</label>
        <progress
          id="hp"
          min="0"
          max="100"
          value={user && user.health}
          className={styles.hp}
        />
        <label>XP</label>
        <progress
          id="xp"
          min="0"
          max="100"
          value={user && user.xp}
          className={styles.xp}
        />
      </div>
      <div className={styles.stats}>
        <span className={styles["stats-info"]}>
          <GiBiceps style={{ color: "#ff8400" }} />
          <strong>{user && Math.round(user.strength)}</strong>
        </span>
        <span className={styles["stats-info"]}>
          <RiMagicFill style={{ color: "#ad27f5" }} />
          <strong>{user && Math.round(user.magic)}</strong>
        </span>

        <span className={styles["stats-info"]}>
          <BsLightningFill style={{ color: "yellow" }} />
          <strong>{user && Math.round(user.stamina)}</strong>
        </span>
        <span className={styles["stats-info"]}>
          <GiTabiBoot style={{ color: "#006eff" }} />
          <strong>{user && Math.round(user.speed)}</strong>
        </span>
      </div>
      <div className={styles.logout}>
        <Button onClick={endSession}>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;
