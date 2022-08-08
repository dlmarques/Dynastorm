import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import styles from "./login.module.css";
import { authActions } from "../../../store/auth/auth";
import Input from "../../App/Components/Input/Input";
import Button from "../../App/Components/Button/Button";
import Header from "../../App/Layout/Topbar/Header";
import Alert from "../../App/Components/Alert/Alert";
import { alertActions } from "../../../store/ui/alert";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const alert = useSelector((state) => state.alert.alert);
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
      dispatch(
        alertActions.setAlert({ title: "Error", message: response.data })
      );
    }
  };

  return (
    <>
      {isLoggedIn ? <Navigate to="/app/home" /> : null}
      <div className={!alert.title ? styles.container : styles.blur}>
        <Header title="Dynastorm" />
        <div className={styles["login-container"]}>
          <form className={styles["form-control"]} onSubmit={loginHandler}>
            <h3>Log in</h3>
            <Input
              data-testid="emailInput"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              role="emailInput"
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
            <Button
              data-testid="loginButton"
              role="loginButton"
              type="submit"
              btn="btnAuth"
            >
              Submit
            </Button>
            <Link to="/register">Create an account!</Link>
          </form>
        </div>
      </div>
      {alert.title && <Alert />}
    </>
  );
};

export default Login;
