import React, {useEffect} from "react";
import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";

import {userActions} from '../../store/auth/user'

import Main from "./Layout/Main/Main";
import Sidebar from "./Layout/Sidebar/Sidebar";
import Header from "./Layout/Topbar/Header";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:3001/api/user/getUserData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((actualData) =>
        dispatch(
          userActions.setUser({
            name: actualData.username,
            avatar: actualData.avatar,
            strength: actualData.strength,
            stamina: actualData.stamina,
            magic: actualData.magic,
            speed: actualData.speed,
            health: actualData.hp,
            money: actualData.money,
            xp: actualData.xp,
          })
        )
      );
  }, []);

  return (
    <div className={styles.container}>
      <Header title="Dynastorm" user={user} />
      <div className={styles.content}>
        <Main />
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
