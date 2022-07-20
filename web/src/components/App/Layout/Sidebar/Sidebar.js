import React from "react";
import styles from "./sidebar.module.scss";
import { GiBiceps } from "react-icons/gi";
import { RiMagicFill } from "react-icons/ri";
import { BsLightningFill } from "react-icons/bs";
import { GiTabiBoot } from "react-icons/gi";
import { logout } from "../../../../store/auth/thunk";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../Components/Button/Button";

import Progress from "../../Components/Progress/Progress";
import Stats from "./components/Stats";
import PerkImage from "../../Components/PerkImage/PerkImage";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const level = useSelector((state) => state.user.level);

  const endSession = () => {
    logout(dispatch);
  };

  return (
    <div className={styles["profile-bar"]}>
      <div className={styles.profile}>
        <img
          src={user && user.avatar}
          alt="avatar profile bar"
          className={styles.avatar}
        />
        <PerkImage
          sidebar={true}
          styles={styles["profile-text"]}
          imageStyle={styles.perkImage}
          user={user}
        />
      </div>
      <div className={styles.bars}>
        <Progress
          label="HP"
          id="hp"
          min="0"
          max="100"
          value={user && user.health}
          styles={styles.hp}
        />
        <Progress
          label="XP"
          id="xp"
          min="0"
          max={level.level * 100}
          value={user && user.xp}
          styles={styles.xp}
        />
      </div>
      <div className={styles.stats}>
        <Stats
          styles={styles["stats-info"]}
          icon={<GiBiceps style={{ color: "#ff8400" }} />}
          value={user && Math.round(user.strength)}
        />
        <Stats
          styles={styles["stats-info"]}
          icon={<RiMagicFill style={{ color: "#ad27f5" }} />}
          value={user && Math.round(user.magic)}
        />
        <Stats
          styles={styles["stats-info"]}
          icon={<BsLightningFill style={{ color: "yellow" }} />}
          value={user && Math.round(user.stamina)}
        />
        <Stats
          styles={styles["stats-info"]}
          icon={<GiTabiBoot style={{ color: "#006eff" }} />}
          value={user && Math.round(user.speed)}
        />
      </div>
      <div className={styles.logout}>
        <Button btn="sidebarBtn" onClick={endSession}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
