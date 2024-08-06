import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../test-render";

import Pagination from "../Pagination";

test("updates URL query parameter when page changes", () => {
  const mockUpdateCurrentPage = jest.fn();

  render(
    <Pagination
      currentPage="1"
      updateCurrentPage={mockUpdateCurrentPage}
      nextPage="2"
      lastPage={10}
    />
  );

  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);

  expect(mockUpdateCurrentPage).toHaveBeenCalledWith("2");
});
