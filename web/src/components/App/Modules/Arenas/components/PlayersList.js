import React, { useEffect, useState } from "react";
import axios from "axios";
import Player from "./Player";
import { useSelector } from "react-redux";
import { environment } from "../../../../../environment/environment";

const PlayersList = () => {
  const [players, setPlayers] = useState();
  const enemy = useSelector((state) => state.enemy.enemy);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    axios
      .post(`${environment.apiUrl}/api/arenas/getAllUsers`, {
        token: token,
      })
      .then((response) => setPlayers(response.data));
  }, [enemy.fight]);

  return (
    <>
      {players &&
        players.map((player, id) => (
          <Player
            key={id}
            id={player._id}
            name={player.username}
            xp={player.xp}
            avatar={player.avatar}
          />
        ))}
    </>
  );
};

export default PlayersList;
