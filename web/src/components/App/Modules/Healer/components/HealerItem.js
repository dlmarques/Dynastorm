import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./item.scss";
import { shopSliceActions } from "../../../../../store/shop/shopSlice";
import { errorActions } from "../../../../../store/ui/error";
import Button from "../../../Components/Button/Button";

const HealerItem = ({ img, id }) => {
  const dispatch = useDispatch();
  const [heal, setHeal] = useState();
  const [price, setPrice] = useState();
  const user = useSelector((state) => state.user.user);

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

  const healing = async () => {
    const token = localStorage.getItem("authToken");
    const response = axios.patch("http://localhost:3001/api/healer/heal", {
      token: token,
      heal: heal,
      price: price,
    });
    if (user.money < price) {
      dispatch(
        errorActions.setError(
          "You don't have enough money, wait until next day"
        )
      );
    } else {
      if (user.health === 100) {
        dispatch(errorActions.setError("Your HP is full"));
      } else {
        try {
          const data = await response;
          console.log(data);
          dispatch(shopSliceActions.buy());
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="item">
      <img src={img} alt="food" />
      <h2>Heal {heal}%</h2>
      <Button onClick={healing} btn="healBtn">
        Buy: ${price}
      </Button>
    </div>
  );
};

export default HealerItem;
