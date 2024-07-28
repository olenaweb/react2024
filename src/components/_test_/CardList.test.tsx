import { screen } from "@testing-library/react";
import { render } from "../../test-render";
import { Container } from "./../../containers/Container";
import { act } from "react";

test("renders the number of cards greater than 0", () => {
  const mockResults = [
    { id: 1, name: "Rick", gender: "Male", status: "Alive", image: "rick.png" },
    { id: 2, name: "Morty", gender: "Male", status: "Alive", image: "morty.png" },
  ];
  act(() => {
    render(<Container results={mockResults} />);
  });
  const cards = screen.getAllByRole("listitem");
  expect(cards.length).toBeGreaterThan(0);
});
