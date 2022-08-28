import React, { useState } from "react";
import Tooltip from "../Tooltip/Tooltip";

const Progress = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      {isVisible && <Tooltip info={props.value} stat={props.stat} />}
      <label>{props.label}</label>
      <progress
        id={props.id}
        min={props.min}
        max={props.max}
        value={props.value}
        className={props.styles}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
    </>
  );
};

export default Progress;
