import React from 'react'
import styles from './button.module.css'

const Button = props => {
  return (
    <button className={styles.button} type={props.type} onClick={props.onClick}>
        {props.children}
    </button>
  )
}

export default Button