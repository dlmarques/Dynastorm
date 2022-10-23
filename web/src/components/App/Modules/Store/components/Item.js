import React, { useState } from "react";
import styles from "./item.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { shopSliceActions } from "../../../../../store/shop/shopSlice";

import Counter from "./Counter";
import Product from "./Product";
import { alertActions } from "../../../../../store/ui/alert";
import { environment } from "../../../../../environment/environment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const token = sessionStorage.getItem("authToken");
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
        await response;
        dispatch(shopSliceActions.buy());
        setQuantity(1);
        toast.success("Success", {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
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
    toast.error("An error occurred", {
      position: toast.POSITION.TOP_RIGHT,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <div className={styles.item}>
      <Product img={img} quantity={quantity} item={item} setItem={setItem} />
      <Counter quantity={quantity} setQuantity={setQuantity} />
      <div>
        <button className={styles.buy} onClick={() => buyItem()}>
          {item.price && `OC${item.price * quantity}`}
        </button>
      </div>
    </div>
  );
};

export default Item;
