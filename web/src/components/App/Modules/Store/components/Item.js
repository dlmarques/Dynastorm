import React, { useState } from "react";
import styles from "./item.module.scss";

import Counter from "./Counter";
import Product from "./Product";
import Button from "../../../Components/Button/Button";

const Item = ({ img }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.item}>
      <Product img={img} quantity={quantity} />
      <Counter quantity={quantity} setQuantity={setQuantity} />
      <div className={styles.buy}>
      <button className={styles.buy}>Buy</button>
      </div>
    </div>
  );
};

export default Item;
