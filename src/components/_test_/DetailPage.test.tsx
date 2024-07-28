import { screen } from "@testing-library/react";
import { render } from "../../test-render";

import DetailPage from "../../pages/DetailPage";
import { act } from "react";

test("displays a loading indicator while fetching data", () => {
  act(() => {
    render(<DetailPage />);
  });
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});
