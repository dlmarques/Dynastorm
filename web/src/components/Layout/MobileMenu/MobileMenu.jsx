import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./mobileMenu.module.scss";
import { logout } from "../../../store/auth/thunk";
import { links } from "../../../utils/links";

import { MdOutlineLogout } from "react-icons/md";
import { BiArrowToLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { mobileMenuActions } from "../../../store/ui/mobileMenu";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState();
  const [changed, setChanged] = useState(0);
  const mobileMenu = useSelector((state) => state.mobileMenu.isOpened);

  useEffect(() => {
    setUrl(window.location.href);
  }, [changed]);

  const endSession = () => {
    logout(dispatch);
  };

  const closeMenu = () => {
    dispatch(mobileMenuActions.close());
  };

  const handleClick = () => {
    dispatch(mobileMenuActions.close());
    setChanged(changed + 1);
  };

  return (
    <div className={mobileMenu ? styles.mobileMenuActive : styles.mobileMenu}>
      <header>
        <h2>Omenia</h2>
        <div className={styles.icons}>
          <MdOutlineLogout onClick={endSession} />
          <BiArrowToLeft onClick={closeMenu} />
        </div>
      </header>
      <nav className={styles.navMobileMenu}>
        <ul>
          {links &&
            links.map((link, id) => (
              <li key={id}>
                <span className={styles.maskMobileMenu}>
                  <Link
                    data-title={link}
                    className={
                      url && url.includes(link)
                        ? styles["link-activeMobileMenu"]
                        : styles["linkMobileMenu"]
                    }
                    to={`/app/${link}`}
                    onClick={handleClick}
                  >
                    {link}
                  </Link>
                </span>
              </li>
            ))}
        </ul>
      </nav>
      <p>© 2022 dlmarques</p>
    </div>
  );
};

export default MobileMenu;
