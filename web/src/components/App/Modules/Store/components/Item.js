import React, { useState } from "react";
import styles from "./item.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { shopSliceActions } from "../../../../../store/shop/shopSlice";

import Counter from "./Counter";
import Product from "./Product";
import { alertActions } from "../../../../../store/ui/alert";
import { environment } from "../../../../../environment/environment";

const Item = ({ img }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState({
    name: null,
    skill: null,
    boost: null,
    price: null,
    keyname: null,
  });
  const user = useSelector((state) => state.user.user);

  const buyItem = async () => {
    const token = localStorage.getItem("authToken");
    const price = item.price * quantity;

    let response = axios.post(`${environment.apiUrl}/api/inventory/addItem`, {
      token,
      itemName: item.name,
      itemSkill: item.skill,
      quantity: quantity,
      price: price,
      boost: item.boost,
      keyname: item.keyname,
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
      dispatch(
        alertActions.setAlert({
          message: "You don't have enough money",
        })
      );
    }
  };

  return (
    <div className={styles.item}>
      <Product img={img} quantity={quantity} item={item} setItem={setItem} />
      <Counter quantity={quantity} setQuantity={setQuantity} />
      <div className={styles.buy}>
        <button className={styles.buy} onClick={buyItem}>
          Buy {item.price && `$${item.price * quantity}`}
        </button>
      </div>
    </div>
  );
};

export default Item;
