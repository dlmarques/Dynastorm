import React from "react";
import styles from "./item.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";

import { shopSliceActions } from "../../../../../store/shop/shopSlice";
import { storeItems } from "../../../../../assets/storeItems/storeItems";

const InventoryItem = ({ name, skill, quantity, price, id }) => {
  const dispatch = useDispatch();
  const sellItem = async () => {
    const token = localStorage.getItem("authToken");
    let fetch = axios.patch("http://localhost:3001/api/inventory/sellItem", {
      token: token,
      id: id,
    });
    try {
      await fetch;
      dispatch(shopSliceActions.buy());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.img}>
        {storeItems &&
          storeItems
            .filter((item) => item.includes(name.replace(/ /g, "")))
            .map((item, id) => <img key={id} src={item} alt="item" />)}
      </div>
      <div className={styles.text}>
        <h1>{name}</h1>
        <h2>{skill}</h2>
        <h3>Qt: {quantity}</h3>
        <button onClick={sellItem}>Sell item for ${price / 2}</button>
      </div>
    </div>
  );
};

export default InventoryItem;
