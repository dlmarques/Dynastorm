/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Sidebar from "./Sidebar";

test("should sidebar render", async () => {
  //create mock store
  const intialState = { user: false };
  const mockStore = configureStore();
  let store = mockStore(intialState);

  render(
    <Provider store={store}>
      <Sidebar title="Dynastorm" />
    </Provider>
  );

  const logout = screen.getByText("logout", { exact: false });
  waitFor(() => expect(logout).toBeInTheDocument());
});
