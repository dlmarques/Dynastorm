import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./app.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import schedule from "node-schedule";

import { userActions } from "../../store/auth/user";
import { bossActions } from "../../store/auth/bosses";
import { setLevel, setTier } from "../../utils/Level";
import { links } from "../../utils/links";
import { environment } from "../../environment/environment";

import Main from "../Layout/Main/Main";
import Sidebar from "../Layout/Sidebar/Sidebar";
import Trigger from "../App/Components/Trigger/Trigger";

import { notificationsActions } from "../../store/ui/notifications";
import { currentSenderActions } from "../../store/chat/currentSender";
import MobileMenu from "../Layout/MobileMenu/MobileMenu";

const App = () => {
  const dispatch = useDispatch();
  const TWOSECONDS_MS = 2000;
  const [nextDay, setNextDay] = useState(false);
  const changed = useSelector((state) => state.user.chnageRoute);
  const [url, setUrl] = useState();
  const shouldFetch = useRef(true);
  const user = useSelector((state) => state.user.user);
  const battle = useSelector((state) => state.user.battles);
  const isNew = useSelector((state) => state.user.user.isNew);
  const change = useSelector((state) => state.shop.purchased);
  const missions = useSelector((state) => state.user.missions);
  const enemy = useSelector((state) => state.enemy.enemy);
  const reload = useSelector((state) => state.enemy.reload);
  const token = localStorage.getItem("authToken");
  schedule.scheduleJob("0 0 * * *", () => {
    setNextDay(!nextDay);
  });

  useEffect(() => {
    axios
      .post(`${environment.apiUrl}/api/auth/getUserData`, {
        token: token,
      })
      .then((response) => {
        dispatch(
          userActions.setUser({
            name: response.data.username,
            avatar: response.data.avatar,
            strength: response.data.strength,
            armor: response.data.armor,
            magic: response.data.magic,
            magicResist: response.data.magicResist,
            health: response.data.hp,
            money: response.data.money,
            xp: response.data.xp,
            isNew: response.data.new,
            perk: response.data.perk,
            currentBoss: response.data.currentBoss,
            id: response.data.id,
          })
        );
        dispatch(currentSenderActions.setSender(response.data));
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
        .get(`${environment.apiUrl}/api/battles/getBosses`)
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
        .post(`${environment.apiUrl}/api/noti/getNotifications`, {
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
    axios.patch(`${environment.apiUrl}/api/user/stopFight`, {
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

  const changeRoute = () => {
    dispatch(userActions.navigate());
  };

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
                        onClick={changeRoute}
                      >
                        {link}
                      </Link>
                    </span>
                  </li>
                ))}
            </ul>
          </nav>
        </Sidebar>
        <MobileMenu />
        <Main background="app" isNew={isNew} />
        <Trigger />
      </div>
    </>
  );
};

export default App;
