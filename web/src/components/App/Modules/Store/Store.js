import React from "react";
import Item from "./components/Item";
import styles from "./store.module.scss";

import { storeItems } from "../../../../assets/storeItems/storeItems";

const Store = () => {
  return (
    <div className={styles["store-container"]}>
      {storeItems && storeItems.map((img, id) => <Item key={id} img={img} />)}
    </div>
  );
};

export default Store;
