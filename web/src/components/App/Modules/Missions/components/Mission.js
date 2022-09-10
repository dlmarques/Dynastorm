import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Countdown from "react-countdown";
import "./mission.scss";
import { userActions } from "../../../../../store/auth/user";
import Button from "../../../Components/Button/Button";
import { alertActions } from "../../../../../store/ui/alert";
import { environment } from "../../../../../environment/environment";

const Mission = ({ id, name, status, xp, money, duration, startedTime }) => {
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .post(`${environment.apiUrl}/api/user/checkBusy`, {
        token: token,
      })
      .then((response) => setBusy(response.data));
  }, []);

  const startMission = async () => {
    const token = localStorage.getItem("authToken");
    if (!busy) {
      setTimeout(() => {
        dispatch(userActions.startMission());
        dispatch(userActions.setBusy());
      }, 500);
      setTimeout(() => {
        dispatch(userActions.startMission());
        dispatch(userActions.stopBusy());
      }, duration * 61 * 1000);
      axios.patch(`${environment.apiUrl}/api/missions/startMission`, {
        id: id,
        token: token,
        startedTime: Date.now(),
      });
    } else {
      dispatch(
        alertActions.setAlert({
          message: "You are busy right now, finish all pending tasks",
        })
      );
    }
  };

  setTimeout(() => {
    dispatch(userActions.startMission());
    dispatch(userActions.stopBusy());
  }, duration * 61 * 1000);
  return (
    <div className="mission">
      <div className="left">
        <h2
          style={
            status === "completed"
              ? { textDecoration: "2px line-through" }
              : null
          }
        >
          {name}
        </h2>
        <h3>
          This mission gives you {xp}xp and ${money}
        </h3>
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
        <h3>{duration} minute(s)</h3>
      </div>
    </div>
  );
};

export default Mission;
