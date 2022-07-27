import React, { useState } from "react";
import "animate.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../../store/auth/user";
import { errorActions } from "../../../../../store/ui/error";
import Button from "../../../Components/Button/Button";
import swords from "../../../../../assets/random-stuff/swords.png";
import "./mid.scss";

const Mid = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState();
  const boss = useSelector((state) => state.bosses.bosses);
  const user = useSelector((state) => state.user.user);
  const busy = useSelector((state) => state.user.user.busy);

  const request = () => {
    const token = localStorage.getItem("authToken");
    dispatch(userActions.setBusy());
    axios
      .post("http://localhost:3001/api/battles/fightBoss", {
        token: token,
        bossId: boss
          .filter((boss) => boss.boss === user.currentBoss)
          .map((boss) => {
            return boss.id;
          }),
      })
      .then((response) => {
        if (response.data === "win") {
          setStatus("win");
          dispatch(userActions.defeatBoss());
          dispatch(userActions.battle());
        } else {
          setStatus("defeat");
          dispatch(userActions.battle());
        }
      });
  };

  const fightBoss = async () => {
    if (busy) {
      dispatch(
        errorActions.setError(
          "You are busy right now, finish all pending tasks"
        )
      );
    } else {
      if (user.health <= 0) {
        dispatch(errorActions.setError("You need HP to fight"));
      } else {
        setIsActive(true);
        setStatus("pending");
        setTimeout(request, 5000);
        setTimeout(() => {
          setStatus("");
          setIsActive(false);
          dispatch(userActions.stopBusy());
        }, 7000);
      }
    }
  };

  return (
    <div className="mid">
      <img
        src={swords}
        className={
          isActive
            ? "animate__animated animate__wobble animate__infinite swords"
            : "swords"
        }
        alt="swords"
      />
      <Button
        disabled={isActive}
        btn={
          status === "pending"
            ? "btnBattlePending"
            : status === "win"
            ? "btnBattleWin"
            : status === "defeat"
            ? "btnBattleDefeat"
            : "btnBattle"
        }
        onClick={fightBoss}
      >
        {status === "pending"
          ? "Wait..."
          : status === "win"
          ? "You won!"
          : status === "defeat"
          ? "You lose!"
          : "Fight!"}
      </Button>
      <div className="rewards">
        {boss &&
          boss
            .filter((boss) => boss.boss === user.currentBoss)
            .map((boss) => (
              <>
                <h3 className="rewards-title">Rewards</h3>
                <div className="specialItem">
                  <img
                    src={require(`../../../../../assets/specialItems/${boss.specialItem}.png`)}
                    alt="special item"
                  />
                  <div className="info-rewards">
                    <h3>{boss.boost}%</h3>
                    <h3>{boss.stat}</h3>
                  </div>
                </div>
                <div className="moneyXp">
                  <h3>${boss.moneyReward}</h3>
                  <h3>XP {boss.xpReward}</h3>
                </div>
              </>
            ))}
      </div>
    </div>
  );
};

export default Mid;
