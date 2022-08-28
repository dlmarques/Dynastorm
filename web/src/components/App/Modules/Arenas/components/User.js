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
          <div className={styles.header}>
            <img src={user.avatar} alt="boss" />
            <h3>You</h3>
          </div>
          <Progress
            id="hp"
            min="0"
            max="100"
            value={user.health}
            styles={styles.hp}
          />
          <div className={styles.stats}>
            <h4>Strength: {user.strength}</h4>
            <h4>Armor: {user.armor}</h4>
            <h4>Magic: {user.magic}</h4>
            <h4>Magic Resist: {user.magicResist}</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
