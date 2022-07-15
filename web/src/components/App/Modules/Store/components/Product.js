import React, { useEffect } from "react";

const Product = ({ img, quantity, item, setItem }) => {
  useEffect(() => {
    if (img) {
      if (img.includes("Magic")) {
        if (img.includes("50")) {
          setItem({
            name: "Magic Book",
            skill: "magic",
            boost: 150,
            price: 500,
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Super Magic",
            skill: "magic",
            boost: 200,
            price: 1000,
          });
        }
      } else if (img.includes("Boots")) {
        if (img.includes("50")) {
          setItem({
            name: "Speed Boots",
            skill: "speed",
            boost: 150,
            price: 500,
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Ultimate Boots",
            skill: "speed",
            boost: 200,
            price: 1000,
          });
        }
      } else if (img.includes("Stamina")) {
        if (img.includes("50")) {
          setItem({
            name: "StaminaHerb",
            skill: "stamina",
            boost: 150,
            price: 500,
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Stamina Powered",
            skill: "stamina",
            boost: 200,
            price: 1000,
          });
        }
      } else if (img.includes("Strength")) {
        if (img.includes("100")) {
          setItem({
            name: "Super Strength ",
            skill: "strength",
            boost: 200,
            price: 1000,
          });
        } else if (img.includes("50")) {
          setItem({
            name: "Strength Skill",
            skill: "strength",
            boost: 150,
            price: 500,
          });
        }
      }
    }
  }, []);

  return (
    <>
      <img src={img} alt="store item" />
      <h2>{item.name}</h2>
      <h3>
        Increase your {item.skill} by {item.boost}%
      </h3>
      <h3>{item.price && `$${item.price * quantity}`}</h3>
    </>
  );
};

export default Product;
