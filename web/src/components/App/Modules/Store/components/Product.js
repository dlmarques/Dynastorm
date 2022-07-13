import React, {useState, useEffect} from "react";

const Product = ({img, quantity}) => {
  const [item, setItem] = useState({
    name: null,
    percentage: null,
    price: null
  })
  
  useEffect(() => {
    if(img){
      if (img.includes("magic")) {
        if (img.includes("50")) {
            setItem({ name: "Magic", percentage: 50, price: 500 })
        } else if (img.includes("100")) {
               setItem({ name: "Magic", percentage: 100, price: 1000 })
        }
      } else if (img.includes("speed")) {
        if (img.includes("50")) {
            setItem({ name: "Speed", percentage: 50, price: 500 })
          } else if (img.includes("100")) {
             setItem({ name: "Speed", percentage: 100, price: 1000 })
          }
      } else if (img.includes("stamina")) {
        if (img.includes("50")) {    
            setItem({ name: "Stamina", percentage: 50, price: 500 })
          } else if (img.includes("100")) {    
             setItem({ name: "Stamina", percentage: 100, price: 1000 })
          }
      } else if (img.includes("strength")) {
        if (img.includes("100")) {
              setItem({ name: "Strength", percentage: 100, price: 1000 })
          } else if (img.includes("50")) {
            setItem({ name: "Strength", percentage: 50, price: 500 })
          }
      }
    }
  }, [])

  return (
    <>
      <img src={img} alt="store item" onClick={(e) => console.log(e)}  />
      <h2>
        {item.name && item.name === "Magic"
          ? `${item.name} book`
          : item.name === "Speed"
          ? `${item.name} boots`
          : item.name === "Stamina"
          ? `${item.name} herb`
          : item.name === "Strength"
          ? `${item.name} skill`
          : null}
      </h2>
      <h3>
        Increase your {item.name} by {item.percentage}%
      </h3>
      <h3>{item.price && `$${item.price * quantity}`}</h3>
    </>
  );
};

export default Product;
