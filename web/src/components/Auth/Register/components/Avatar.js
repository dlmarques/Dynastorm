import React from "react";
import styles from "./avatar.module.css";

const Avatar = ({ image, setAvatar }) => {
  return (
    <div className={styles.avatar} onClick={() => setAvatar(image)}>
      <img src={image} alt="avatar" />
    </div>
  );
};

export default Avatar;
