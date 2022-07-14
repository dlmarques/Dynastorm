import React from "react";
import styles from "./input.module.css";

const Input = (props) => {
  return (
    <input
      data-testid={props["data-testid"]}
      role={props.role}
      className={styles.input}
      value={props.value}
      id={props.id}
      name={props.name}
      type={props.type}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
