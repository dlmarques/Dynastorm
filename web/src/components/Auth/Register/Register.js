import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { authActions } from "../../../store/auth/auth";
import Button from "../../App/Components/Button/Button";
import Header from "../../App/Layout/Topbar/Header";
import Input from "../../App/Components/Input/Input";
import styles from "./register.module.css";
import AvatarsBox from "./components/AvatarsBox";
import { errorActions } from "../../../store/ui/error";
import Error from "../../App/Components/Error/Error";
import { avatarActions } from "../../../store/ui/avatars";

const Register = () => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [finished, setFinished] = useState(false);
  const error = useSelector((state) => state.error.error);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isShown = useSelector((state) => state.avatars.isShown);

  useEffect(() => {
    localStorage.authToken
      ? dispatch(authActions.login())
      : dispatch(authActions.logout());
  }, []);

  const avatarBoxHandler = () => {
    dispatch(avatarActions.toggle());
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    let response = axios.post("http://localhost:3001/api/auth/register", {
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
      dispatch(errorActions.setError(err.response.data));
    }
  };

  return (
    <>
      {isLoggedIn ? <Navigate to="/app/home" /> : null}
      {finished ? <Navigate to="/" /> : null}
      <div className={!error ? styles.container : styles.blur}>
        <Header title="Dynastorm" />
        <div className={styles["register-container"]}>
          <form className={styles["form-control"]} onSubmit={registerHandler}>
            <h2>Register</h2>
            <Button btn="btnAuth" type="button" onClick={avatarBoxHandler}>
              {isShown ? "Close avatars box" : "Select an avatar"}
            </Button>
            {isShown ? (
              <AvatarsBox
                data-testid="avatars"
                setAvatar={setAvatar}
                icon={avatar}
              />
            ) : null}
            <Input
              data-testid="usernameInput"
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              data-testid="emailInput"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              data-testid="passwordInput"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button btn="btnAuth" data-testid="registerButton" type="submit">
              Register
            </Button>
            <Link to="/">Already have an account?</Link>
          </form>
        </div>
      </div>
      {error && <Error />}
    </>
  );
};

export default Register;
