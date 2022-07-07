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

const Register = () => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [finished, setFinished] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    localStorage.authToken
      ? dispatch(authActions.login())
      : dispatch(authActions.logout());
  }, []);

  const registerHandler = async (e) => {
    e.preventDefault();

    let response = axios.post("http://localhost:3001/api/user/register", {
      username: username,
      email: email,
      password: password,
      avatar: avatar,
    });

    try {
      const registerResponse = await response;
      if (registerResponse.data === "success") {
        setFinished(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isLoggedIn ? <Navigate to="/app/home" /> : null}
      {finished ? <Navigate to="/" /> : null}
      <div className={styles.container}>
        <Header title="Dynastorm" />
        <div className={styles["register-container"]}>
          <form className={styles["form-control"]} onSubmit={registerHandler}>
            <h2>Register</h2>
            <h3>Choose your avatar</h3>
            <AvatarsBox setAvatar={setAvatar} icon={avatar} />
            <Input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
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
            <Button type="submit">Register</Button>
            <Link to="/">Already have an account?</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
