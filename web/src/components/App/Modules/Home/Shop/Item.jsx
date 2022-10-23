import React from "react";
import axios from "axios";
import Button from "../../../Components/Button/Button";
import styles from "./item.module.scss";
import { environment } from "../../../../../environment/environment";
import { toast } from "react-toastify";

const Item = ({ id, name, price }) => {
  const checkout = () => {
    axios
      .post(`${environment.apiUrl}/api/shop/checkout`, {
        item: [{ id: id, quantity: 1 }],
      })
      .then((res) => {
        window.location.replace(res.data.url);
      })
      .catch((err) => {
        toast.error("An error occurred", {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      });
  };
  return (
    <div className={styles.shopItem}>
      <img src={require("../../../../../assets/coins/coin.png")} alt="coin" />
      <p>{name}</p>
      <Button onClick={() => checkout()} btn="shopBtn">{`$${
        price * 0.01
      }`}</Button>
    </div>
  );
};

export default Item;
