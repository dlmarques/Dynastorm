import React, { useState } from "react";
import "./trigger.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mobileMenuActions } from "../../../../store/ui/mobileMenu";
import { notificationsActions } from "../../../../store/ui/notifications";
import { HiOutlineMenu } from "react-icons/hi";
import { BsFillChatFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";

const Trigger = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const newNotifications = useSelector(
    (state) => state.notifications.newNotifications
  );
  const isVisible = useSelector((state) => state.notifications.isVisible);

  const handler = () => {
    setOpenMenu((open) => !open);
  };

  const toggleNotifications = () => {
    const token = localStorage.getItem("authToken");
    if (isVisible) {
      dispatch(notificationsActions.close());
    } else {
      dispatch(notificationsActions.open());
    }
    async function readNotifications() {
      axios.patch("http://localhost:3001/api/noti/readNotification", {
        token: token,
      });
      dispatch(notificationsActions.read());
    }
    setTimeout(readNotifications, 3000);
  };

  return (
    <>
      <div className="trigger" onClick={handler}>
        <TbGridDots />
      </div>
      <div className={openMenu ? "menu open" : "menu"}>
        <HiOutlineMenu onClick={() => dispatch(mobileMenuActions.open())} />
        <div className="notifications">
          <IoIosNotifications onClick={toggleNotifications} />
          {newNotifications && <div className="dot"></div>}
        </div>
        <BsFillChatFill />
      </div>
    </>
  );
};

export default Trigger;
