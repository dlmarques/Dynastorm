import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/list.module.scss";

import User from "./User";

const UsersList = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .post("http://localhost:3001/api/chat/conn", {
        token,
      })
      .then((response) => setUsers(response.data));
  }, []);

  return (
    <div className={styles.list}>
      {users && users.map((user, id) => <User key={id} user={user} />)}
    </div>
  );
};

export default UsersList;
