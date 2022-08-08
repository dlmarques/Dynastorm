import { render, screen, waitFor } from "@testing-library/react";
import Alert from "./Alert";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

test("should error render", () => {
  const intialState = { error: "Password is invalid" };
  const mockStore = configureStore();
  let store = mockStore(intialState);
  render(
    <Provider store={store}>
      <Alert />
    </Provider>
  );
  const error = screen.getByText(/error/i);
  waitFor(() => expect(error).toBeInTheDocument());
});
