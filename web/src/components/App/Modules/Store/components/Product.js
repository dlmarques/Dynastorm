import React, {  useEffect } from "react";

const Product = ({ img, quantity, item, setItem }) => {
  useEffect(() => {
    if (img) {
      if (img.includes("magic")) {
        if (img.includes("50")) {
          setItem({
            name: "Magic Book",
            skill: "magic",
            percentage: 50,
            price: 500,
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Super Magic Book",
            skill: "magic",
            percentage: 100,
            price: 1000,
          });
        }
      } else if (img.includes("speed")) {
        if (img.includes("50")) {
          setItem({
            name: "Speed Boots",
            skill: "speed",
            percentage: 50,
            price: 500,
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Ultimate Speed Boots",
            skill: "speed",
            percentage: 100,
            price: 1000,
          });
        }
      } else if (img.includes("stamina")) {
        if (img.includes("50")) {
          setItem({
            name: "StaminaHerb",
            skill: "stamina",
            percentage: 50,
            price: 500,
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Stamina Powered",
            skill: "stamina",
            percentage: 100,
            price: 1000,
          });
        }
      } else if (img.includes("strength")) {
        if (img.includes("100")) {
          setItem({
            name: "Super Strength ",
            skill: "strength",
            percentage: 100,
            price: 1000,
          });
        } else if (img.includes("50")) {
          setItem({
            name: "Strength skill",
            skill: "strength",
            percentage: 50,
            price: 500,
          });
        }
      }
    }
  }, []);

  return (
    <>
      <img src={img} alt="store item" onClick={(e) => console.log(e)} />
      <h2>{item.name}</h2>
      <h3>
        Increase your {item.skill} by {item.percentage}%
      </h3>
      <h3>{item.price && `$${item.price * quantity}`}</h3>
    </>
  );
};

export default Product;
