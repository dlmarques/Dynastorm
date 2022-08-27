import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import styles from "./login.module.scss";
import { authActions } from "../../../store/auth/auth";
import { alertActions } from "../../../store/ui/alert";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import Main from "../../Layout/Main/Main";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    localStorage.authToken
      ? dispatch(authActions.login())
      : dispatch(authActions.logout());
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    let response = axios.post("http://localhost:3001/api/auth/login", {
      email: email,
      password: password,
    });

    try {
      const loginResponse = await response;
      const authToken = loginResponse.data.authToken;
      if (authToken) {
        localStorage.setItem("authToken", authToken);
        dispatch(authActions.login());
      } else {
        console.log("User/Password combination does not exist.");
        setEmail("");
        setPassword("");
        dispatch(
          alertActions.setAlert({
            title: "Error",
            message: response.data,
          })
        );
      }
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data);
    }
  };

  return (
    <>
      {isLoggedIn ? <Navigate to="/app/home" /> : null}
      <div className={styles.login}>
        <Sidebar>
          <form className={styles.loginForm} onSubmit={loginHandler}>
            <h4>Sign in</h4>
            <input
              className={styles["login-input"]}
              data-testid="emailInput"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <input
              className={styles["login-input"]}
              data-testid="passwordInput"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <span>{error}</span>}
            <button
              data-testid="loginButton"
              type="submit"
              className={styles["login-btn"]}
            >
              Sign in
            </button>
            <Link to="/register" className={styles["register-link"]}>
              Create an account
            </Link>
          </form>
        </Sidebar>
        <Main background="auth" />
      </div>
    </>
  );
};

export default Login;
