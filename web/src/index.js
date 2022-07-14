import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/Routes";
import { Provider } from "react-redux";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
