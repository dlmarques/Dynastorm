import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./inventory.module.scss";
import InventoryItem from "./components/InventoryItem";
import { useSelector } from "react-redux";
import { environment } from "../../../../environment/environment";

const Inventory = () => {
  const [items, setItems] = useState();
  const change = useSelector((state) => state.shop.purchased);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .post(`${environment.apiUrl}/api/inventory/getItems`, {
        token: token,
      })
      .then((response) => setItems(response.data));
  }, [change]);

  return (
    <div className={styles["inventory-container"]}>
      {items &&
        items.map((item, id) => (
          <InventoryItem
            key={id}
            name={item.itemName}
            skill={item.itemSkill}
            quantity={item.quantity}
            price={item.price}
            id={item._id}
            keyname={item.keyname}
          />
        ))}
    </div>
  );
};

export default Inventory;
