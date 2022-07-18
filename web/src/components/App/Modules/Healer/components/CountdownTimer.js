import React, { useState, useEffect } from "react";
import "./countdownTimer.scss";
import {
  getRemainingTime,
  defaultRemainingTime,
} from "../../../../../utils/CountdownTimerUtils";

const CountdownTimer = () => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function updateRemainingTime() {
    setRemainingTime(getRemainingTime());
  }

  return (
    <div className="countdown-timer">
      <span className="two-numbers">{remainingTime.hours}</span>
      <span>:</span>
      <span className="two-numbers">{remainingTime.minutes}</span>
      <span>:</span>
      <span className="two-numbers">{remainingTime.seconds}</span>
    </div>
  );
};

export default CountdownTimer;
