import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Mission from "./components/Mission";
import styles from "./missions.module.scss";

const Missions = () => {
  const [missions, setMissions] = useState();
  const busy = useSelector((state) => state.user.missions);
  const level = useSelector((state) => state.user.level.level);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:3001/api/missions/getMissions", {
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
      .then((actualData) => setMissions(actualData));
  }, [busy]);
  console.log(missions);
  return (
    <div className={styles["missions-container"]}>
      <h1>Missions</h1>
      {missions &&
        missions
          .filter((mission) => mission.level === level)
          .map((mission, id) => (
            <Mission
              key={id}
              id={mission._id}
              name={mission.missionName}
              description={mission.description}
              status={mission.status}
              xp={mission.xpBoost}
              money={mission.money}
              duration={mission.duration}
              startedTime={mission.date}
            />
          ))}
    </div>
  );
};

export default Missions;
