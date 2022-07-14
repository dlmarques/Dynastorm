/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from "@testing-library/react";
import Header from "./Header";

test("should header render", async () => {
  render(<Header title="Dynastorm" />);

  const logo = screen.getByText("Dynastorm");
  waitFor(() => expect(logo).toBeInTheDocument());
});
