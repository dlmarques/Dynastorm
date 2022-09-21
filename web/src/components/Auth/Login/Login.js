import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import styles from "./login.module.scss";
import { authActions } from "../../../store/auth/auth";
import { alertActions } from "../../../store/ui/alert";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import Main from "../../Layout/Main/Main";
import { environment } from "../../../environment/environment";
import Alert from "../../App/Components/Alert/Alert";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const error = useSelector((state) => state.alert.alert);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    localStorage.authToken
      ? dispatch(authActions.login())
      : dispatch(authActions.logout());
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    let response = axios.post(`${environment.apiUrl}/api/auth/login`, {
      email: email,
      password: password,
    });

    try {
      const loginResponse = await response;
      const authToken = loginResponse.data.authToken;
      if (authToken) {
        localStorage.setItem("authToken", authToken);
        dispatch(authActions.login());
        setEmail("");
        setPassword("");
      } else {
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error.response.data);
      setTimeout(() => {
        if (error) {
          dispatch(
            alertActions.setAlert({
              title: "Error",
              message: error.response.data,
            })
          );
        }
      }, 500);
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
              disabled={error.message}
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
              disabled={error.message}
            />
            <button
              data-testid="loginButton"
              type="submit"
              className={styles["login-btn"]}
              disabled={error.message}
            >
              Sign in
            </button>
            <Link
              to={!error.message && "/register"}
              className={styles["register-link"]}
              disabled={error.message}
            >
              Create an account
            </Link>
          </form>
          {error.message && <Alert />}
        </Sidebar>
        <Main background="auth" />
      </div>
    </>
  );
};

export default Login;
