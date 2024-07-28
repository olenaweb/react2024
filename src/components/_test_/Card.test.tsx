// Card.test.tsx
import { render, screen } from "@testing-library/react";
import { Card } from "../Card";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { act } from "react";

const mockStore = configureStore([]);

jest.mock("../../store/useTheme", () => ({
  useTheme: jest.fn(),
}));

jest.mock("../../store/services/characterApi", () => ({
  useGetCharacterByIdQuery: jest.fn(),
}));

import { useGetCharacterByIdQuery } from "../../store/services/characterApi";
import { useTheme } from "../../store/useTheme";

test("renders the relevant card data", () => {
  const mockData = {
    id: 1,
    name: "Rick",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "rick.png",
  };

  // Мокируем результат работы хука useGetCharacterByIdQuery
  (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
    data: mockData,
    error: null,
    isLoading: false,
  });

  // Мокируем результат работы хука useTheme
  (useTheme as jest.Mock).mockReturnValue({ theme: "light" });

  const initialState = {
    favorites: {
      favorites: [],
    },
  };
  const store = mockStore(initialState);
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Card {...mockData} />
        </Router>
      </Provider>
    );
  });

  expect(screen.getByText(/Rick/i)).toBeInTheDocument();
  expect(screen.getByAltText(/Rick/i)).toHaveAttribute("src", "rick.png");
  expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
  expect(screen.getByText(/Alive/i)).toBeInTheDocument();
});
