import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DetailPage from "../../pages/DetailPage";

import { useGetCharacterByIdQuery } from "../../store/services/characterApi";
import { ThemeProvider } from "../../store/ThemeContext";

// Мокируем хук useGetCharacterByIdQuery
jest.mock("../../store/services/characterApi", () => ({
  useGetCharacterByIdQuery: jest.fn(),
}));

// Мокируем ThemeProvider
const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe("DetailPage", () => {
  it("renders loading state", () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={["/detail/1"]}>
        <MockThemeProvider>
          <DetailPage />
        </MockThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // it("renders error state", () => {
  //   (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
  //     error: true,
  //   });

  //   render(
  //     <MemoryRouter initialEntries={["/detail/1"]}>
  //       <MockThemeProvider>
  //         <DetailPage />
  //       </MockThemeProvider>
  //     </MemoryRouter>
  //   );


  //   expect(screen.getByText(/error/i)).toBeInTheDocument();
  // });

  it("renders character details", () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: {
        id: "1",
        name: "Rick Sanchez",
        image: "image_url",
        status: "Alive",
        species: "Human",
        gender: "Male",
        type: "Scientist",
        location: { name: "Earth" },
        created: "2020-01-01",
      },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/detail/1"]}>
        <MockThemeProvider>
          <DetailPage />
        </MockThemeProvider>
      </MemoryRouter>
    );


    expect(screen.getByText(/Detail for ID: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
    expect(screen.getByText(/Type: Scientist/i)).toBeInTheDocument();
    expect(screen.getByText(/Location: Earth/i)).toBeInTheDocument();
    expect(screen.getByText(/Created: 2020-01-01/i)).toBeInTheDocument();
  });
});