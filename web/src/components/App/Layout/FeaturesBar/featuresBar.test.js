/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import FeaturesBar from "./FeaturesBar";
import { createMemoryHistory } from "history";


test("should header render", () => {
    const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <FeaturesBar />
    </Router>
  );

  const feature = screen.getByText("Home", { exact: false });
  waitFor(() => expect(feature).toBeInTheDocument());
});
