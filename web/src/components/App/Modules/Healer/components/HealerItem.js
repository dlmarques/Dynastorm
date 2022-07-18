import React, { useEffect, useState } from "react";
import "./item.scss";
import Button from "../../../Components/Button/Button";

const HealerItem = ({ img, id }) => {
  const [heal, setHeal] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    if (id === 0) {
      setHeal(25);
      setPrice(100);
    } else if (id === 1) {
      setHeal(50);
      setPrice(250);
    } else if (id === 2) {
      setHeal(100);
      setPrice(500);
    }
  }, []);

  return (
    <div className="item">
      <img src={img} alt="food" />
      <h2>Heal {heal}%</h2>
      <Button btn="healBtn">Buy: ${price}</Button>
    </div>
  );
};

export default HealerItem;
