import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import styles from "./login.module.css";
import { authActions } from '../../../store/auth/auth'
import {errorActions} from '../../../store/ui/error'
import Input from "../../App/Components/Input/Input";
import Button from "../../App/Components/Button/Button";
import Header from "../../App/Layout/Topbar/Header";
import Error from "../../App/Components/Error/Error";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const error = useSelector(state => state.error.error)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn) 

  useEffect(() => {
    localStorage.authToken ? dispatch(authActions.login()) : dispatch(authActions.logout());
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    let response = axios.post("http://localhost:3001/api/auth/login", {
      email: email,
      password: password,
    });

    try {
      const loginResponse = await response;
      const authToken = loginResponse.data.authToken
      if(authToken){
        localStorage.setItem("authToken", authToken) 
        dispatch(authActions.login())
      }else{
        console.log("User/Password combination does not exist.");
        setEmail("");
        setPassword("");
        dispatch(errorActions.setError(error.response.data))
      }
    } catch (error) {
      console.error(error.response.data)
      dispatch(errorActions.setError(error.response.data))
    }
  };

  return (
    <>
      {isLoggedIn ? <Navigate to="/app/home" /> : null}
      <div className={!error ? styles.container : styles.blur}>
        <Header title='Dynastorm'/>
        <div className={styles["login-container"]}>
          <form className={styles["form-control"]} onSubmit={loginHandler}>
            <h3>Log in</h3>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              role='emailInput'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button role='loginButton' type="submit">Submit</Button>
            <Link to='/register'>Create an account!</Link>
          </form>
        </div>
      </div>
      {error &&
          <Error/>}
    </>
  );
};

export default Login;
