// src/components/__tests__/Card.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Card } from "../Card";

test("renders card with correct data", () => {
  render(
    <MemoryRouter>
      <Card id={1} name="Rick Sanchez" gender="Male" species="Human" status="Alive" image="url" />
    </MemoryRouter>
  );

  expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
  expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
});

test("navigates to DetailPage on card click", () => {
  render(
    <MemoryRouter>
      <Card id={1} name="Rick Sanchez" gender="Male" species="Human" status="Alive" image="url" />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole("link");
  fireEvent.click(linkElement);
  expect(window.location.pathname).toContain(`/`);
});
