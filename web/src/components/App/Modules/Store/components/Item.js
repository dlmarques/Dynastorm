import React, { useState } from "react";
import styles from "./item.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { shopSliceActions } from "../../../../../store/shop/shopSlice";
import { errorActions } from "../../../../../store/ui/error";

import Counter from "./Counter";
import Product from "./Product";

const Item = ({ img }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState({
    name: null,
    skill: null,
    percentage: null,
    price: null,
  });
  const user = useSelector((state) => state.user.user);

  const buyItem = async () => {
    const authToken = localStorage.getItem("authToken");
    const price = item.price * quantity;

    let response = axios.post("http://localhost:3001/api/inventory/addItem", {
      token: authToken,
      itemName: item.name,
      itemSkill: item.skill,
      quantity: quantity,
      price: price,
      percentage: item.percentage / 100,
    });

    if (user.money >= price) {
      try {
        const registerResponse = await response;
        dispatch(shopSliceActions.buy());
        if (registerResponse.data === "success") {
          console.log("success");
        }
        setQuantity(1);
      } catch (err) {
        console.error(err);
      }
    } else {
      dispatch(errorActions.setError("You don't have enough money"));
    }
  };

  return (
    <div className={styles.item}>
      <Product img={img} quantity={quantity} item={item} setItem={setItem} />
      <Counter quantity={quantity} setQuantity={setQuantity} />
      <div className={styles.buy}>
        <button className={styles.buy} onClick={buyItem}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default Item;
