import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./home.module.scss";
import { useSelector } from "react-redux";
import { convert } from "../../../../utils/numbersConvert";
import Item from "./Shop/Item";
import { environment } from "../../../../environment/environment";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    axios
      .get(`${environment.apiUrl}/api/shop/getShopItems`)
      .then((res) => setItems(res.data));
  }, []);

  return (
    <div className={styles["home-container"]}>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && (
        <>
          <h1>Welcome back {user && user.name}</h1>
          <div className={styles.content}>
            <div className={styles.shopContainer}>
              <div className={styles.shop}>
                {items &&
                  items.map((item) => (
                    <Item
                      id={item.id}
                      price={item.priceInCents}
                      name={item.description}
                    />
                  ))}
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.user}>
                <div className={styles.userInfo}>
                  <img src={user.avatar} alt="avatar" />
                  <div className={styles.text}>
                    <p>@{user.name}</p>
                    <div className={styles.stats}>
                      <p className={styles.hpInfo}>
                        HP
                        <strong className={styles.hpValue}>
                          {user.health}
                        </strong>
                      </p>
                      <p className={styles.moneyInfo}>
                        OC
                        <strong className={styles.moneyValue}>
                          {Math.floor(user.money)}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.grid}>
                  <p>
                    Strength <br />
                    <strong> {convert(Math.floor(user.strength), 0)}</strong>
                  </p>
                  <p>
                    Magic <br />
                    <strong> {convert(Math.floor(user.magic), 0)}</strong>
                  </p>
                  <p>
                    M. Resist <br />
                    <strong> {convert(Math.floor(user.magicResist), 0)}</strong>
                  </p>
                  <p>
                    Armor <br />
                    <strong> {convert(Math.floor(user.armor), 0)}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
