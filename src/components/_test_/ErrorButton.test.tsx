// src/components/__tests__/ErrorButton.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorButton from "../ErrorButton";
import { act } from "react";

test("renders error button", () => {
  act(() => {
    render(<ErrorButton />);
  });
  const loadingMessage = screen.getByText(/Create Error/i);
  expect(loadingMessage).toBeInTheDocument();
  expect(screen.getByRole("button")).toHaveTextContent("Create Error");
});
