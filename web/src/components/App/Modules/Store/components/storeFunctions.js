import { shopSliceActions } from "../../../../../store/shop/shopSlice";

export const setItem = (img, dispatch) => {
  if (img.includes("magic")) {
    if (img.includes("50")) {
      dispatch(
        shopSliceActions.setItem({ name: "Magic", percentage: 50, price: 500 })
      );
    } else if (img.includes("100")) {
      dispatch(
        shopSliceActions.setItem({ name: "Magic", percentage: 100, price: 1000 })
      );
    }
  } else if (img.includes("speed")) {
    if (img.includes("50")) {
        dispatch(
          shopSliceActions.setItem({ name: "Speed", percentage: 50, price: 500 })
        );
      } else if (img.includes("100")) {
        dispatch(
          shopSliceActions.setItem({ name: "Speed", percentage: 100, price: 1000 })
        );
      }
  } else if (img.includes("stamina")) {
    if (img.includes("50")) {
        dispatch(
          shopSliceActions.setItem({ name: "Stamina", percentage: 50, price: 500 })
        );
      } else if (img.includes("100")) {
        dispatch(
          shopSliceActions.setItem({ name: "Stamina", percentage: 100, price: 1000 })
        );
      }
  } else if (img.includes("strength")) {
    if (img.includes("50")) {
        dispatch(
          shopSliceActions.setItem({ name: "Strength", percentage: 50, price: 500 })
        );
      } else if (img.includes("100")) {
        dispatch(
          shopSliceActions.setItem({ name: "Strength", percentage: 100, price: 1000 })
        );
      }
  }
};
