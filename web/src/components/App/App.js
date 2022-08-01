import React, { useEffect, useRef } from "react";
import styles from "./app.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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
import { notificationsActions } from "../../store/ui/notifications";

const App = () => {
  const dispatch = useDispatch();
  const shouldFetch = useRef(true);
  const shouldFetchNotifications = useRef(true);
  const user = useSelector((state) => state.user.user);
  const battle = useSelector((state) => state.user.battles);
  const isNew = useSelector((state) => state.user.user.isNew);
  const mobileMenu = useSelector((state) => state.mobileMenu.isOpened);
  const change = useSelector((state) => state.shop.purchased);
  const error = useSelector((state) => state.error.error);
  const missions = useSelector((state) => state.user.missions);
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

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
  }, [change, missions, battle]);

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
                moneyReward: boss.moneyReward,
                xpReward: boss.xpReward,
                duration: boss.duration,
              })
            );
          })
        );
    }
  }, [user.currentBoss]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .post("http://localhost:3001/api/noti/getNotifications", {
        token: token,
      })
      .then((response) =>
        response.data.map((notification) => {
          if (!notification.read) {
            dispatch(notificationsActions.addNotifications());
          }
        })
      );
  }, [change, missions, battle]);

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
