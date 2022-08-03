import React, { useEffect, useState } from "react";
import axios from "axios";
import Player from "./Player";

const PlayersList = () => {
  const [players, setPlayers] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .post("http://localhost:3001/api/arenas/getAllUsers", {
        token: token,
      })
      .then((response) => setPlayers(response.data));
  }, []);

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
