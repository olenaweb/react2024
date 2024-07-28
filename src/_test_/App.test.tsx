import { render } from "../test-render"; // Импортируйте customRender из test-utils
import App from "../App";
// import { act } from "react";

describe("App", () => {
  it("renders correctly", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Just a moment.../i)).toBeInTheDocument();
  });
});
