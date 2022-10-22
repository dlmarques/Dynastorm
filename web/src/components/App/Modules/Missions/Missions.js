import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Mission from "./components/Mission";
import styles from "./missions.module.scss";
import { environment } from "../../../../environment/environment";

const Missions = () => {
  const [missions, setMissions] = useState();
  const busy = useSelector((state) => state.user.missions);
  const level = useSelector((state) => state.user.level.level);
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    axios
      .post(`${environment.apiUrl}/api/missions/getMissions`, {
        token: token,
      })
      .then((response) => setMissions(response.data));
  }, [busy]);

  return (
    <div className={styles["missions-container"]}>
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
