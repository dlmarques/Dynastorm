import React from "react";

const Progress = props => {
  return (
    <>
      <label>{props.label}</label>
      <progress
        id={props.id}
        min={props.min}
        max={props.max}
        value={props.value}
        className={props.styles}
      />
    </>
  );
};

export default Progress;
