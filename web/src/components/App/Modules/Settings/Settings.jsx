import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Button from "../../Components/Button/Button";
import styles from "./settings.module.scss";
import { environment } from "../../../../environment/environment";
import { alertActions } from "../../../../store/ui/alert";
import { toast } from "react-toastify";

const Settings = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const user = useSelector((state) => state.user.user);
  const alert = useSelector((state) => state.alert.alert);

  useEffect(() => {
    if (alert.confirmed) {
      deleteAccount();
    }
  }, [alert.confirmed]);

  const changePassword = () => {
    const token = sessionStorage.getItem("authToken");
    axios
      .patch(`${environment.apiUrl}/api/settings/changePassword`, {
        token,
        password,
        newPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Changed, you will be redirected to login`, {
            position: toast.POSITION.TOP_RIGHT,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          setTimeout(() => {
            sessionStorage.removeItem("authToken");
            window.location.reload();
          }, 5000);
        }
      })
      .catch((err) => {
        toast.error(`An error occurred`, {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        dispatch(
          alertActions.setAlert({
            message: err.response.data,
          })
        );
      });
  };

  const deleteAccount = () => {
    const token = sessionStorage.getItem("authToken");

    axios
      .post(`${environment.apiUrl}/api/settings/deleteAccount`, {
        token: token,
      })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.removeItem("authToken");
          window.location.reload();
        }
      })
      .catch((err) => {
        toast.error(`An error occurred`, {
          position: toast.POSITION.TOP_RIGHT,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      });
  };

  const confirmDelete = () => {
    dispatch(
      alertActions.setAlert({
        message: "Are you sure do you want delete your account?",
        confirm: true,
      })
    );
  };

  return (
    <div className={styles["settings-container"]}>
      <img src={user.avatar} alt="avatar" />

      <input
        type="text"
        id="username"
        name="username"
        value={`@${user.name}`}
        disabled
      />
      <span>Change your password</span>
      <div className={styles.passwords}>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="off"
        />
      </div>
      <Button btn="changePasswordBtn" onClick={() => changePassword()}>
        Change password
      </Button>
      <span id={styles.delete} onClick={() => confirmDelete()}>
        Delete account
      </span>
    </div>
  );
};

export default Settings;
