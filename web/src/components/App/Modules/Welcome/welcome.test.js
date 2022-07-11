/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("welcome component", () => {
  const intialState = { user: false };
  const mockStore = configureStore();
  let store = mockStore(intialState);

  test("should welcome container render", () => {
    render(
      <Provider store={store}>
        <Welcome />
      </Provider>
    );
    const title = screen.getByText("Welcome, please select a perk to start", {
      exact: false,
    });
    expect(title).toBeInTheDocument();
  });
});
