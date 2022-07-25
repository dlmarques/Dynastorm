import React, { useEffect } from "react";

const Product = ({ img, item, setItem }) => {
  useEffect(() => {
    if (img) {
      if (img.includes("Resistance")) {
        if (img.includes("50")) {
          setItem({
            name: "Basic Magic Resistance",
            skill: "magic resistance",
            boost: 150,
            price: 500,
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Ultimate Magic Resistance",
            skill: "magic resistance",
            boost: 200,
            price: 1000,
          });
        }
      } else if (img.includes("Magic")) {
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
      } else if (img.includes("Armor")) {
        if (img.includes("50")) {
          setItem({
            name: "Armor",
            skill: "armor",
            boost: 150,
            price: 500,
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Super Armor",
            skill: "armor",
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
    </>
  );
};

export default Product;
