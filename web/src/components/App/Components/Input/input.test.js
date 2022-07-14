/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from "@testing-library/react";
import Input from "./Input";

test("should input render with their props", () => {
  render(<Input data-testid="input" />);

  const input = screen.getByTestId("input");
  waitFor(() => expect(input).toBeInTheDocument());
});
