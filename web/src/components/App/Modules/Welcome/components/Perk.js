import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./perk.module.scss";
import { userActions } from "../../../../../store/auth/user";

const Perk = ({ image }) => {
  const dispatch = useDispatch();
  const [perkName, setPerkName] = useState();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (image && image.includes("magic")) {
      setPerkName("magic");
    } else if (image && image.includes("speed")) {
      setPerkName("speed");
    } else if (image && image.includes("strength")) {
      setPerkName("strength");
    } else {
      setPerkName("");
    }
  }, []);

  const setPerk = async () => {
    try {
      fetch("http://localhost:3001/api/user/setPerk", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: user.name,
          perk: perkName,
        }),
      });
      dispatch(userActions.welcome());
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles["perk-container"]}>
      <img src={image} alt="skill_image" onClick={setPerk} />
      <h3>{perkName}</h3>
      <h4>Increase {perkName} by 50%</h4>
    </div>
  );
};

export default Perk;
