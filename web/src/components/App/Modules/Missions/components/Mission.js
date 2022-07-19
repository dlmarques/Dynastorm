import React from "react";
import { useDispatch } from "react-redux";
import Countdown from "react-countdown";
import "./mission.scss";
import { errorActions } from "../../../../../store/ui/error";
import { userActions } from "../../../../../store/auth/user";
import Button from "../../../Components/Button/Button";

const Mission = ({
  id,
  name,
  description,
  status,
  xp,
  money,
  duration,
  startedTime,
}) => {
  const dispatch = useDispatch();
  const startMission = async () => {
    const token = localStorage.getItem("authToken");
    dispatch(userActions.startMission());
    setTimeout(() => {
      dispatch(userActions.startMission());
    }, duration * 61 * 1000);
    await fetch("http://localhost:3001/api/missions/startMission", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: id,
        token: token,
        startedTime: Date.now(),
      }),
    });
  };

  return (
    <div className="mission">
      <div className="left">
        <h2>{name}</h2>
        <h3>{description}</h3>
        <h3>{duration} minute(s)</h3>
      </div>
      <div className="right">
        {status === "in progress" ? (
          <Button disabled={true} btn="missionBtn">
            <Countdown daysInHours date={startedTime + duration * 60 * 1000} />
          </Button>
        ) : status === "completed" ? (
          <Button disabled={true} btn="missionBtn">
            Completed
          </Button>
        ) : (
          <Button btn="missionBtn" onClick={startMission}>
            Start
          </Button>
        )}
        <h3>Rewards</h3>
        <h3>{xp}XP</h3>
        <h3>${money}</h3>
      </div>
    </div>
  );
};

export default Mission;
