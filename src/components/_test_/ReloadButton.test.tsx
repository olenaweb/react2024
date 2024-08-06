// src/components/__tests__/ReloadButton.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorButton from "../ReloadButton";
import { act } from "react";

test("renders reload message", () => {
  act(() => {
    render(<ErrorButton />);
  });
  const loadingMessage = screen.getByText(/Sorry, try again/i);
  expect(loadingMessage).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Sorry, try again");
});
