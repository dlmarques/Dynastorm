import React from "react";

const Stats = (props) => {
  return (
    <span className={props.styles}>
      {props.icon}
      <strong>{props.value}</strong>
    </span>
  );
};

export default Stats;
