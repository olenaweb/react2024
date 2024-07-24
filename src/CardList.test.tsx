// src/components/__tests__/App.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

jest.mock("./request/getData", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      info: { count: 10, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          gender: "Male",
          species: "Human",
          status: "Alive",
          image: "url",
        },
      ],
    })
  ),
}));

test("renders cards when data is available", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const cardElements = await screen.findAllByRole("listitem");
  expect(cardElements.length).toBeGreaterThan(0);
});

// test('shows message when no cards are found', async () => {
//   jest.mock('./request/getData', () => ({
//     getData: jest.fn(() => Promise.resolve({
//       error: 'Character not found'
//     }))
//   }));

//   render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>
//   );

//   const errorMessage = await screen.findByText(/Sorry, the name is not found. Try another name/i);
//   expect(errorMessage).toBeInTheDocument();
// });
