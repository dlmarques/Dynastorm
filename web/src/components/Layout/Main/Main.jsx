import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Container from "../../App/Components/Notifications/components/Container";
import Arenas from "../../App/Modules/Arenas/Arenas";
import Battles from "../../App/Modules/Battles/Battles";
import Chat from "../../App/Modules/Chat/Chat";
import Healer from "../../App/Modules/Healer/Healer";
import Home from "../../App/Modules/Home/Home";
import Inventory from "../../App/Modules/Inventory/Inventory";
import Missions from "../../App/Modules/Missions/Missions";
import Store from "../../App/Modules/Store/Store";
import Welcome from "../../App/Modules/Welcome/Welcome";
import Alert from "../../App/Components/Alert/Alert";

import Profile from "./components/Profile";
import styles from "./main.module.scss";

const Main = ({ background, isNew }) => {
  const alert = useSelector((state) => state.alert.alert);

  return (
    <main className={background === "app" ? styles.mainApp : styles.mainAuth}>
      {background === "app" && (
        <div className={styles.content}>
          <header>
            <Profile />
          </header>
          <div className={styles.container}>
            {isNew ? (
              <Welcome />
            ) : (
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/missions" element={<Missions />} />
                <Route path="/battles" element={<Battles />} />
                <Route path="/arenas" element={<Arenas />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/healer" element={<Healer />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            )}
          </div>
          <Container />
          {alert && alert.message && <Alert />}
        </div>
      )}
    </main>
  );
};

export default Main;
