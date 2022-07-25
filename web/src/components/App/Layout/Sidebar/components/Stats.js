import React, { useState } from "react";
import Tooltip from "../../../Components/Tooltip/Tooltip";

const Stats = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <span
      className={props.styles}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ userSelect: "none" }}
    >
      {props.icon}
      <strong>{props.value}</strong>
      {isVisible && <Tooltip info={props.name} />}
    </span>
  );
};

export default Stats;
