import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/Auth/Login/Login";
import App from "../components/App/App";
import Register from "../components/Auth/Register/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/app/*"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
