import React, { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";

const Delayed = ({ children, waitingTime = 500 }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, waitingTime);
  }, [waitingTime]);

  return isShown ? children : <LoadingPage />;
};

export default Delayed;
