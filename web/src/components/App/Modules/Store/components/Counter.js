import React from 'react'
import styles from './counter.module.scss'

const Counter = ({quantity, setQuantity}) => {

    const decrement = () => {
        if(quantity === 1){
            return;
        }
        setQuantity(quantity - 1)
    }
    const increment = () => {
        setQuantity(quantity + 1)
    }

  return (
    <div className={styles.counter}>
        <button onClick={decrement}>-</button>
        <h4>
            {quantity}
        </h4>
        <button onClick={increment}>+</button>
        
    </div>
  )
}

export default Counter