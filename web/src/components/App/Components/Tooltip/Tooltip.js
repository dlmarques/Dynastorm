import React from "react";
import "./tooltip.scss";

const Tooltip = ({ info }) => {
  return <div className="tooltip">{info && info}</div>;
};

export default Tooltip;
