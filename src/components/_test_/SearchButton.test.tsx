import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../test-render";
import SearchInput from "../SearchButton";

test("saves the entered value to local storage on search", () => {
  const mockUpdateStoreValue = jest.fn();

  render(<SearchInput searchValue="" updateStoreValue={mockUpdateStoreValue} />);

  const input = screen.getByPlaceholderText("Enter the name");
  fireEvent.change(input, { target: { value: "Rick" } });
  fireEvent.click(screen.getByText("🔍"));

  expect(mockUpdateStoreValue).toHaveBeenCalledWith("Rick");
});

test("retrieves the value from local storage upon mounting", () => {
  localStorage.setItem("olena_01_search", "Rick");

  render(<SearchInput searchValue="Rick" />);

  expect(screen.getByDisplayValue("Rick")).toBeInTheDocument();
});
