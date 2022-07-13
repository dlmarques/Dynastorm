import React, { useEffect } from "react";
import styles from "./app.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../store/auth/user";
import { setLevel, setTier } from "../../utils/Level";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import Main from "./Layout/Main/Main";
import Sidebar from "./Layout/Sidebar/Sidebar";
import Header from "./Layout/Topbar/Header";
import Welcome from "./Modules/Welcome/Welcome";
import Delayed from "../../utils/Delayed";
import MobileMenu from "./Layout/MobileMenu/MobileMenu";
import Trigger from "./Components/Trigger/Trigger";
import { mobileMenuActions } from "../../store/ui/mobileMenu";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isNew = useSelector((state) => state.user.user.isNew);
  const mobileMenu = useSelector((state) => state.mobileMenu.isOpened);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:3001/api/auth/getUserData", {
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
            isNew: actualData.new,
            perk: actualData.perk,
          })
        )
      );
    try {
      const level = setLevel(user.xp);
      const tier = setTier(level);
      dispatch(
        userActions.setLevel({
          level: level,
          tier: tier,
        })
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      {isNew ? (
        <Delayed>
          <Welcome />
        </Delayed>
      ) : (
        <Delayed>
          <div className={styles.container}>
            <Header title="Dynastorm" user={user} />
            <div className={styles.content}>
              <Main />
              <Sidebar />
            </div>
            <div className={styles['mobile-trigger']}>
              <Trigger
                icon={<HiOutlineMenuAlt2 />}
                action={mobileMenuActions.open()}
              />
            </div>
          </div>
          {mobileMenu && <MobileMenu active={mobileMenu} />}
        </Delayed>
      )}
    </>
  );
};

export default App;
