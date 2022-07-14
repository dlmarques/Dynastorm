/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { createMemoryHistory } from "history";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

describe("App component", () => {
  //create mock store
  const user = {
    isNew: false,
    name: "user",
  };
  const intialState = { user: user };
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
    const title = await screen.findByText("dynastorm", { exact: false });
    waitFor(() => expect(title).toBeInTheDocument());
  });
});
