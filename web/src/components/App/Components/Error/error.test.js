/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable jest/valid-expect */
/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from "@testing-library/react";
import Error from "./Error";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

test("should error render", () => {
  const intialState = { error: "Password is invalid" };
  const mockStore = configureStore();
  let store = mockStore(intialState);
  render(
    <Provider store={store}>
      <Error />
    </Provider>
  );
  const error = screen.getByText(/error/i);
  waitFor(() => expect(error).toBeInTheDocument());
});
