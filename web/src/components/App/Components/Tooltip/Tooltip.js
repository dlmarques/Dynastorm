import React from "react";
import "./tooltip.scss";

const Tooltip = ({ info, stat }) => {
  return (
    <div className="tooltip">
      {info && info}
      {stat && stat}
    </div>
  );
};

export default Tooltip;
