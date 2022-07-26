import React, { useEffect, useRef } from "react";
import styles from "./app.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../store/auth/user";
import { bossActions } from "../../store/auth/bosses";
import { setLevel, setTier } from "../../utils/Level";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import Main from "./Layout/Main/Main";
import Sidebar from "./Layout/Sidebar/Sidebar";
import Header from "./Layout/Topbar/Header";
import Welcome from "./Modules/Welcome/Welcome";
import Delayed from "../../utils/Delayed";
import MobileMenu from "./Layout/MobileMenu/MobileMenu";
import Trigger from "./Components/Trigger/Trigger";
import Error from "./Components/Error/Error";

import { mobileMenuActions } from "../../store/ui/mobileMenu";

const App = () => {
  const dispatch = useDispatch();
  const shouldFetch = useRef(true);
  const user = useSelector((state) => state.user.user);
  const isNew = useSelector((state) => state.user.user.isNew);
  const mobileMenu = useSelector((state) => state.mobileMenu.isOpened);
  const change = useSelector((state) => state.shop.purchased);
  const error = useSelector((state) => state.error.error);
  const busy = useSelector((state) => state.user.missions);

  useEffect(() => {
    fetch("http://localhost:3001/api/battles/createBosses");
  }, []);

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
            armor: actualData.armor,
            magic: actualData.magic,
            magicResist: actualData.magicResist,
            health: actualData.hp,
            money: actualData.money,
            xp: actualData.xp,
            isNew: actualData.new,
            perk: actualData.perk,
            currentBoss: actualData.currentBoss,
          })
        )
      );
    dispatch(
      userActions.setLevel({
        level: setLevel(user.xp),
        tier: setTier(user.xp),
      })
    );
  }, [change, busy]);

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      fetch("http://localhost:3001/api/battles/getBosses")
        .then((response) => response.json())
        .then((actualData) =>
          actualData.map((boss) => {
            dispatch(
              bossActions.addBosses({
                id: boss._id,
                boss: boss.boss,
                bossName: boss.bossName,
                strength: boss.strength,
                armor: boss.armor,
                magic: boss.magic,
                magicResist: boss.magicResist,
                hp: boss.hp,
                specialItem: boss.specialItem,
                boost: boss.boost,
                stat: boss.stat,
              })
            );
          })
        );
    }
  }, []);

  dispatch(
    userActions.setLevel({
      level: setLevel(user.xp),
      tier: setTier(user.xp),
    })
  );

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
            <div className={styles["mobile-trigger"]}>
              <Trigger
                icon={<HiOutlineMenuAlt2 />}
                action={mobileMenuActions.open()}
              />
            </div>
          </div>
          {error && <Error />}
          {mobileMenu && <MobileMenu active={mobileMenu} />}
        </Delayed>
      )}
    </>
  );
};

export default App;
