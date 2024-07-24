// src/components/__tests__/Pagination.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../Pagination";
import { MemoryRouter } from "react-router-dom";

test("updates URL query parameter on page change", () => {
  const updateCurrentPage = jest.fn();

  render(
    <MemoryRouter>
      <Pagination currentPage="1" updateCurrentPage={updateCurrentPage} nextPage="2" lastPage={5} />
    </MemoryRouter>
  );

  const nextButton = screen.getByText(/Next/i);
  fireEvent.click(nextButton);
  expect(updateCurrentPage).toHaveBeenCalledWith("2");
});
