import React from "react";
import styles from "./avatarsbox.module.css";
import Avatar from "./Avatar";
import avatars from '../../../../assets/avatars/avatars'

const AvatarsBox = ({setAvatar, icon}) => {
  return (
    <div data-testid='avatars' className={styles["avatar-container"]}>
      {avatars &&
        avatars.map((avatar, id) => <Avatar key={id} image={avatar} setAvatar={setAvatar} icon={icon} />)}
    </div>
  );
};

export default AvatarsBox;
