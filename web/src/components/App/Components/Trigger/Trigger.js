import React, { useState } from "react";
import "./trigger.scss";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { mobileMenuActions } from "../../../../store/ui/mobileMenu";
import { HiOutlineMenu } from "react-icons/hi";

const Trigger = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);

  const handler = () => {
    setOpenMenu((open) => !open);
    dispatch(mobileMenuActions.open());
  };

  return (
    <div className="trigger" onClick={handler}>
      <HiOutlineMenu
        className={
          openMenu ? "animate__animated animate__rotateIn" : "menu-trigger"
        }
      />
    </div>
  );
};

export default Trigger;
