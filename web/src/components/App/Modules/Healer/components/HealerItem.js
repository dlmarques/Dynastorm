import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./item.scss";
import { shopSliceActions } from "../../../../../store/shop/shopSlice";
import Button from "../../../Components/Button/Button";
import { alertActions } from "../../../../../store/ui/alert";
import { environment } from "../../../../../environment/environment";

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
    const token = sessionStorage.getItem("authToken");

    if (user.money < price) {
      dispatch(
        alertActions.setAlert({
          title: "Error",
          message: "You don't have enough money, wait until next day",
        })
      );
    } else {
      const response = axios.patch(`${environment.apiUrl}/api/healer/heal`, {
        token: token,
        heal: heal,
        price: price,
      });
      if (user.health === 100) {
        dispatch(
          alertActions.setAlert({ title: "Error", message: "Your HP is full" })
        );
      } else {
        try {
          await response;
          dispatch(shopSliceActions.buy());
        } catch (error) {
          console.error(error);
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
