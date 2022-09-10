import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { authActions } from "../../../store/auth/auth";
import styles from "./register.module.scss";
import AvatarsBox from "./components/AvatarsBox";
import { avatarActions } from "../../../store/ui/avatars";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import Main from "../../Layout/Main/Main";
import { environment } from "../../../environment/environment";
import { alertActions } from "../../../store/ui/alert";
import Alert from "../../App/Components/Alert/Alert";

const Register = () => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [finished, setFinished] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.alert.alert);
  const isShown = useSelector((state) => state.avatars.isShown);

  useEffect(() => {
    localStorage.authToken
      ? dispatch(authActions.login())
      : dispatch(authActions.logout());
  }, []);

  const avatarBoxHandler = () => {
    dispatch(avatarActions.toggle());
  };

  const selectAvatar = (avatar) => {
    console.log(avatar);
    setAvatar(avatar);
    dispatch(avatarActions.toggle());
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    let response = axios.post(`${environment.apiUrl}/api/auth/register`, {
      username: username,
      email: email,
      password: password,
      avatar: avatar,
    });

    try {
      await response;
      setFinished(true);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        if (err) {
          dispatch(
            alertActions.setAlert({
              title: "Error",
              message: err.response.data,
            })
          );
        }
      }, 500);
    }
  };
  return (
    <>
      {isLoggedIn ? <Navigate to="/app/home" /> : null}
      {finished ? <Navigate to="/" /> : null}
      <div className={styles.register}>
        <Sidebar>
          <form className={styles.registerForm} onSubmit={registerHandler}>
            <h4>{!isShown && "Sign up"}</h4>
            <button
              type="button"
              data-testid="registerButton"
              className={styles["register-btn"]}
              onClick={avatarBoxHandler}
            >
              Choose an avatar
            </button>
            <input
              data-testid="usernameInput"
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles["register-input"]}
              autoComplete="off"
            />
            <input
              data-testid="emailInput"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles["register-input"]}
              autoComplete="off"
            />
            <input
              data-testid="passwordInput"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles["register-input"]}
            />
            <button
              data-testid="registerButton"
              type="submit"
              className={styles["register-btn"]}
            >
              Sign up
            </button>
            {!isShown && (
              <Link to="/" className={styles["register-link"]}>
                Already have an account
              </Link>
            )}
            {isShown ? (
              <AvatarsBox
                data-testid="avatars"
                setAvatar={selectAvatar}
                icon={avatar}
              />
            ) : null}
          </form>
          {error.message && <Alert />}
        </Sidebar>
        <Main background="auth" />
      </div>
    </>
  );
};

export default Register;
