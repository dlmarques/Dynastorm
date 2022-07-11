/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from "@testing-library/react";
import Perk from "./Perk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("welcome component", () => {
  const intialState = { user: false };
  const mockStore = configureStore();
  let store = mockStore(intialState);

  test("should welcome container render", () => {
    render(
      <Provider store={store}>
        <Perk />
      </Provider>
    );
    const title = screen.getByText("Increase by 50%", {
      exact: false,
    });
    expect(title).toBeInTheDocument();
  });
});
