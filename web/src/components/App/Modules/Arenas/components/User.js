import React from "react";
import styles from "./user.module.scss";
import { useSelector } from "react-redux";
import Stats from "../../../Layout/Sidebar/components/Stats";
import Progress from "../../../Components/Progress/Progress";
import { GiBiceps } from "react-icons/gi";
import { RiMagicFill } from "react-icons/ri";
import { BsShieldShaded } from "react-icons/bs";
import { GiMagicPalm } from "react-icons/gi";

const User = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      {user.name && (
        <div className={styles.user}>
          <img src={user.avatar} alt="boss" />
          <h3>You</h3>
          <Progress
            id="hp"
            min="0"
            max="100"
            value={user.health}
            styles={styles.hp}
          />
          <div className={styles.stats}>
            <Stats
              name="Strength"
              styles={styles["stats-info"]}
              icon={<GiBiceps style={{ color: "#ff8400" }} />}
              value={Math.round(user.strength)}
            />
            <Stats
              name="Magic Power"
              styles={styles["stats-info"]}
              icon={<RiMagicFill style={{ color: "#ad27f5" }} />}
              value={Math.round(user.magic)}
            />
            <Stats
              name="Armor"
              styles={styles["stats-info"]}
              icon={<BsShieldShaded style={{ color: "#fff" }} />}
              value={Math.round(user.armor)}
            />
            <Stats
              name="Magic Resistance"
              styles={styles["stats-info"]}
              icon={<GiMagicPalm style={{ color: "#006eff" }} />}
              value={Math.round(user.magicResist)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default User;
