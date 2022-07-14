import React from "react";
import styles from "./avatar.module.css";

const Avatar = ({ image, setAvatar, icon }) => {
  return (
    <div
      className={icon === image ? styles["avatar-active"] : styles.avatar}
      onClick={() => setAvatar(image)}
    >
      <img src={image} alt="avatar" />
    </div>
  );
};

export default Avatar;
