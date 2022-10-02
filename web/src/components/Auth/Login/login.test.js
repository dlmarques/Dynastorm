import { render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

describe("Login component", () => {
  //create mock store
  const intialState = {
    error: {
      title: "test",
      message: "test message",
    },
    auth: false,
    alert: {
      title: "test",
      message: "test message",
    },
    user: {
      isNew: false,
    },
  };
  const mockStore = configureStore();
  let store = mockStore(intialState);

  const history = createMemoryHistory();

  test("should register form render", async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <Login />
        </Provider>
      </Router>
    );
    const emailInput = screen.getByTestId("emailInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const loginButton = screen.getByTestId("loginButton");
    waitFor(() =>
      expect(emailInput, passwordInput, loginButton).toBeInTheDocument()
    );
  });
});
