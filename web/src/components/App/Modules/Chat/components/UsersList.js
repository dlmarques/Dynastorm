import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/list.module.scss";

import User from "./User";
import { environment } from "../../../../../environment/environment";

const UsersList = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    axios
      .post(`${environment.apiUrl}/api/chat/conn`, {
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
