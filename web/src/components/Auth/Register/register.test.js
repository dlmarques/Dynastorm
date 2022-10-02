import { render, screen, waitFor } from "@testing-library/react";
import Register from "./Register";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

describe("Register component", () => {
  const intialState = {
    auth: {
      isLoggedin: false,
    },
    avatars: false,
    alert: {
      alert: {
        title: "test title",
        message: "test message",
      },
    },
    error: {},
  };
  const mockStore = configureStore();
  let store = mockStore(intialState);

  const history = createMemoryHistory();

  test("should register form render", async () => {
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );

    const usernameInput = screen.getByTestId("usernameInput");
    const emailInput = screen.getByTestId("emailInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const registerButton = screen.getByTestId("registerButton");
    waitFor(() =>
      expect(
        usernameInput,
        emailInput,
        passwordInput,
        registerButton
      ).toBeInTheDocument()
    );
  });

  test("should avatars box render after click", async () => {
    //Arrange
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <Register />
        </Provider>
      </Router>
    );

    //Act
    const avatarButton = screen.getByText("Choose an avatar", { exact: false });
    userEvent.click(avatarButton);

    //Assert
    waitFor(() => expect(avatarButton).not.toBeInTheDocument());
  });
});
