import React from "react";
import styles from "./button.module.css";

const Button = (props) => {
  return (
    <button
      data-testid={props["data-testid"]}
      role={props.role}
      className={props.auth ? styles.btnAuth : styles.button}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
