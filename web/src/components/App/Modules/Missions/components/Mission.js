import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Countdown from "react-countdown";
import "./mission.scss";
import { userActions } from "../../../../../store/auth/user";
import Button from "../../../Components/Button/Button";
import { alertActions } from "../../../../../store/ui/alert";
import { environment } from "../../../../../environment/environment";
import { toast } from "react-toastify";

const Mission = ({ id, name, status, xp, money, duration, startedTime }) => {
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    axios
      .post(`${environment.apiUrl}/api/user/checkBusy`, {
        token: token,
      })
      .then((response) => setBusy(response.data));
  }, []);

  const startMission = async () => {
    const token = sessionStorage.getItem("authToken");
    if (!busy) {
      toast.info(
        "You have start a mission, you are busy from now until the mission ends",
        {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        }
      );
      setTimeout(() => {
        dispatch(userActions.startMission());
        dispatch(userActions.setBusy());
      }, 500);
      setTimeout(() => {
        dispatch(userActions.startMission());
        dispatch(userActions.stopBusy());
        toast.success("Mission completed", {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
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
          This mission gives you {xp}xp and OC{money}
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
          <Button btn="missionBtn" onClick={() => startMission}>
            Start
          </Button>
        )}
        <h3>{duration} minute(s)</h3>
      </div>
    </div>
  );
};

export default Mission;
