import React, { useEffect, useState } from "react";

const Product = ({ img, item, setItem }) => {
  const [boost, setBoost] = useState();

  useEffect(() => {
    if (img) {
      if (img.includes("Resistance")) {
        if (img.includes("50")) {
          setItem({
            name: "Basic Magic Resistance",
            skill: "magic resistance",
            boost: 150,
            price: 500,
            keyname: "BasicMagicResistance50",
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Ultimate Magic Resistance",
            skill: "magic resistance",
            boost: 200,
            price: 1000,
            keyname: "UltimateMagicResistance100",
          });
        }
      } else if (img.includes("Magic")) {
        if (img.includes("50")) {
          setItem({
            name: "Magic Book",
            skill: "magic",
            boost: 150,
            price: 500,
            keyname: "MagicBook50",
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Super Magic",
            skill: "magic",
            boost: 200,
            price: 1000,
            keyname: "SuperMagic100",
          });
        }
      } else if (img.includes("Armor")) {
        if (img.includes("50")) {
          setItem({
            name: "Armor",
            skill: "armor",
            boost: 150,
            price: 500,
            keyname: "Armor50",
          });
        } else if (img.includes("100")) {
          setItem({
            name: "Super Armor",
            skill: "armor",
            boost: 200,
            price: 1000,
            keyname: "SuperArmor100",
          });
        }
      } else if (img.includes("Strength")) {
        if (img.includes("100")) {
          setItem({
            name: "Super Strength ",
            skill: "strength",
            boost: 200,
            price: 1000,
            keyname: "StrengthSkill50",
          });
        } else if (img.includes("50")) {
          setItem({
            name: "Strength Skill",
            skill: "strength",
            boost: 150,
            price: 500,
            keyname: "SuperStrength100",
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (item.boost === 150) {
      setBoost(50);
    } else if (item.boost === 200) {
      setBoost(100);
    }
  }, []);

  return (
    <>
      <img src={img} alt="store item" />
      <h2>{item.name}</h2>
      <h3>
        Increase your {item.skill} by {boost && boost}%
      </h3>
    </>
  );
};

export default Product;
