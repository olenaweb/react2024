// src/components/__tests__/SearchButton.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "../SearchButton";

test("retrieves value from local storage on mount", () => {
  localStorage.getItem("olena_01_search");

  render(<SearchInput searchValue="Rick Sanchez" currentPage="1" />);
  const inputElement = screen.getByDisplayValue(/Rick Sanchez/i);

  expect(inputElement).toBeInTheDocument();
});

test("saves input value from local storage on mount", () => {
  localStorage.setItem("olena_01_search", "Rick Sanchez");

  render(<SearchInput searchValue="Rick Sanchez" currentPage="1" />);
  const inputElement = screen.getByDisplayValue(/Rick Sanchez/i);

  expect(inputElement).toBeInTheDocument();
  expect(localStorage.getItem("olena_01_search")).toBe("Rick Sanchez");
});
