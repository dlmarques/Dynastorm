import React from "react";
import styles from "./button.module.scss";

const Button = (props) => {
  return (
    <button
      data-testid={props["data-testid"]}
      role={props.role}
      className={styles[props.btn]}
      type={props.type}
      onClick={() => props.onClick()}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
