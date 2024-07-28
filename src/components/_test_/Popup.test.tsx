import { fireEvent, screen } from "@testing-library/react";
// import { screen } from '@testing-library/react';
import { render } from "../../test-render";
import Popup from "../Popup";
import { FavoriteItem } from "../../types/types";

// Мокируем CSVLink
jest.mock("react-csv", () => ({
  CSVLink: jest.fn(({ children }) => <a href="/fake-csv-link">{children}</a>),
}));

const mockUseTheme = {
  theme: "light",
};
jest.mock("../../store/useTheme", () => ({
  useTheme: () => mockUseTheme,
}));

describe("Popup component", () => {
  const mockDeselectAll = jest.fn();
  const mockFavorites: FavoriteItem[] = [
    { id: 1, name: "Rick", image: "rick.png", gender: "Male", species: "Human", status: "Alive" },
    { id: 2, name: "Morty", image: "morty.png", gender: "Male", species: "Human", status: "Alive" },
  ];

  test("displays the correct item count", () => {
    render(<Popup itemCount={2} onDeselectAll={mockDeselectAll} favorites={mockFavorites} />);
    expect(screen.getByText(/Selected 2 items/i)).toBeInTheDocument();
  });

  test('calls onDeselectAll when "Deselect All" button is clicked', () => {
    render(<Popup itemCount={2} onDeselectAll={mockDeselectAll} favorites={mockFavorites} />);
    const deselectButton = screen.getByText(/Deselect All/i);
    fireEvent.click(deselectButton);
    expect(mockDeselectAll).toHaveBeenCalledTimes(1);
  });

  test("renders a download link with correct data", () => {
    render(<Popup itemCount={2} onDeselectAll={mockDeselectAll} favorites={mockFavorites} />);
    const downloadLink = screen.getByText(/Download/i).closest("a");
    expect(downloadLink).toHaveAttribute("href", "/fake-csv-link");
  });
});
