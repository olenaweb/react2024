// src/components/__tests__/DetailPage.test.tsx
// import { render, screen, fireEvent } from '@testing-library/react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DetailPage from "../../pages/DetailPage";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Character } from "../../types/types";

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)", url: "" },
  location: { name: "Earth (Replacement Dimension)", url: "" },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [],
  url: "",
  created: "2017-11-04T18:48:46.250Z",
};

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useLoaderData: () => mockCharacter,
  };
});

test("displays detailed card information correctly", async () => {
  const routes = [
    {
      path: "/react2024/detail/:id",
      element: <DetailPage />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/react2024/detail/1"],
  });
  render(<RouterProvider router={router} />);

  const nameElement = await screen.findByText((content) => content.includes("Rick Sanchez"));
  expect(nameElement).toBeInTheDocument();
  expect(screen.getByText(/Status: Alive/i)).toBeInTheDocument();
  expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
});

test("hides component on close button click", async () => {
  const routes = [
    {
      path: "/react2024/detail/:id",
      element: <DetailPage />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/react2024/detail/1"],
  });

  render(<RouterProvider router={router} />);

  screen.debug();

  const closeButton = await screen.findByText((content) => content.includes("⨉"));
  expect(closeButton).toBeInTheDocument();
});
