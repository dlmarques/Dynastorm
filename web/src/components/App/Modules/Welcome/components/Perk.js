import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "./perk.module.scss";
import { userActions } from "../../../../../store/auth/user";
import { environment } from "../../../../../environment/environment";

const Perk = ({ image }) => {
  const dispatch = useDispatch();
  const [perkName, setPerkName] = useState();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (image && image.includes("magic")) {
      setPerkName("magic");
    } else if (image && image.includes("speed")) {
      setPerkName("magicResist");
    } else if (image && image.includes("strength")) {
      setPerkName("strength");
    } else {
      setPerkName("");
    }
  }, []);

  const setPerk = async () => {
    try {
      axios.patch(`${environment.apiUrl}/api/user/setPerk`, {
        username: user.name,
        perk: perkName,
      });
      axios.get(`${environment.apiUrl}/api/battles/createBosses`);
      dispatch(userActions.welcome());
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles["perk-container"]}>
      <img src={image} alt="skill_image" onClick={setPerk} />
      <h3>{perkName === "magicResist" ? "magic resist" : perkName}</h3>
      <h4>
        Increase {perkName === "magicResist" ? "magic resist" : perkName} by 50%
      </h4>
    </div>
  );
};

export default Perk;
