import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./app.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import schedule from "node-schedule";

import { userActions } from "../../store/auth/user";
import { bossActions } from "../../store/auth/bosses";
import { setLevel, setTier } from "../../utils/Level";
import { links } from "./Layout/FeaturesBar/components/activeLink";

import Main from "../Layout/Main/Main";
import Sidebar from "../Layout/Sidebar/Sidebar";

import { notificationsActions } from "../../store/ui/notifications";
import { currentSenderActions } from "../../store/chat/currentSender";

const App = () => {
  const dispatch = useDispatch();
  const TWOSECONDS_MS = 2000;
  const [nextDay, setNextDay] = useState(false);
  const [changed, setChanged] = useState(0);
  const [url, setUrl] = useState();
  const shouldFetch = useRef(true);
  const user = useSelector((state) => state.user.user);
  const battle = useSelector((state) => state.user.battles);
  const isNew = useSelector((state) => state.user.user.isNew);
  const mobileMenu = useSelector((state) => state.mobileMenu.isOpened);
  const change = useSelector((state) => state.shop.purchased);
  const alert = useSelector((state) => state.alert.alert);
  const missions = useSelector((state) => state.user.missions);
  const enemy = useSelector((state) => state.enemy.enemy);
  const reload = useSelector((state) => state.enemy.reload);
  const token = localStorage.getItem("authToken");
  schedule.scheduleJob("0 0 * * *", () => {
    setNextDay(!nextDay);
  });

  useEffect(() => {
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
      .then((actualData) => {
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
            id: actualData.id,
          })
        );
        dispatch(currentSenderActions.setSender(actualData));
      });
    dispatch(
      userActions.setLevel({
        level: setLevel(user.xp),
        tier: setTier(user.xp),
      })
    );
  }, [change, missions, battle, nextDay, enemy.fight, reload]);

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      axios
        .get("http://localhost:3001/api/battles/getBosses")
        .then((actualData) =>
          actualData.data.map((boss) => {
            return dispatch(
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
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/api/noti/getNotifications", {
          token: token,
        })
        .then((response) =>
          response.data.map((notification) => {
            if (!notification.read) {
              dispatch(notificationsActions.addNotifications());
              new Audio("../../assets/notification/notification.mp3");
            }
          })
        );
    }, TWOSECONDS_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.patch("http://localhost:3001/api/user/stopFight", {
      token: token,
    });
  }, []);

  dispatch(
    userActions.setLevel({
      level: setLevel(user.xp),
      tier: setTier(user.xp),
    })
  );

  useEffect(() => {
    setUrl(window.location.href);
  }, [changed]);

  return (
    <>
      <div className={styles.app}>
        <Sidebar app={true}>
          <nav className={styles.nav}>
            <ul>
              {links &&
                links.map((link, id) => (
                  <li key={id}>
                    <span className={styles.mask}>
                      <Link
                        data-title={link}
                        className={
                          url && url.includes(link)
                            ? styles["link-active"]
                            : styles["link"]
                        }
                        to={`/app/${link}`}
                        onClick={() => setChanged(changed + 1)}
                      >
                        {link}
                      </Link>
                    </span>
                  </li>
                ))}
            </ul>
          </nav>
        </Sidebar>
        <Main background="app" isNew={isNew} />
      </div>
    </>
  );
};

export default App;
