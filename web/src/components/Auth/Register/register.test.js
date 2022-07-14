/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from "@testing-library/react";
import Register from "./Register";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

describe("Register component", () => {
  //create mock store
  const intialState = { error: false, auth: false, avatars: false };
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
    const avatarButton = screen.getByText("Select an avatar", { exact: false });
    userEvent.click(avatarButton);

    //Assert
    waitFor(() => expect(avatarButton).not.toBeInTheDocument());
  });
});
