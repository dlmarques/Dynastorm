import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

describe("App component", () => {
  //create mock store
  const user = {
    user: {
      isNew: false,
    },
    name: "user",
  };
  const shop = {
    purchased: false,
  };
  const enemy = {
    enemy: {},
  };
  const mobileMenu = {
    isOpened: false,
  };
  const alert = {
    title: "test",
    message: "test message",
  };
  const notifications = {
    newNotifications: {},
  };

  const intialState = {
    user: user,
    shop: shop,
    enemy: enemy,
    mobileMenu: mobileMenu,
    alert: alert,
    notifications: notifications,
  };

  const mockStore = configureStore();
  let store = mockStore(intialState);

  const history = createMemoryHistory();

  test("should app component render", async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
    const title = await screen.findByTestId("logo");
    waitFor(() => expect(title).toBeInTheDocument());
  });
});
