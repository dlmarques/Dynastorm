import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../Modules/Home/Home";
import Store from "../../Modules/Store/Store";
import Missions from "../../Modules/Missions/Missions";
import Battles from "../../Modules/Battles/Battles";
import Inventory from "../../Modules/Inventory/Inventory";
import Healer from "../../Modules/Healer/Healer";
import FeaturesBar from "../FeaturesBar/FeaturesBar";
import Arenas from "../../Modules/Arenas/Arenas";
import Chat from "../../Modules/Chat/Chat";

import styles from "./main.module.scss";

const Main = () => {
  return (
    <>
      <main className={styles["main-container"]}>
        <FeaturesBar />
        <div className={styles.content}>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="store" element={<Store />} />
            <Route path="missions" element={<Missions />} />
            <Route path="battles" element={<Battles />} />
            <Route path="arenas" element={<Arenas />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="healer" element={<Healer />} />
            <Route path="chat" element={<Chat />} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default Main;
