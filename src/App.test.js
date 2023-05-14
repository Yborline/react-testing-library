import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders App component", async () => {
    render(<App />);

    expect(screen.queryByText(/Logged in as/i)).toBeNull();
    screen.debug();
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();
    screen.debug();

    expect(screen.getByLabelText(/search/i)).toBeRequired();
    expect(screen.getByLabelText(/search/i)).toBeEmptyDOMElement();
    expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");
    // expect(screen.queryByText(/Searches for React/i)).toBeNull();
    // expect(screen.getByText(/Search:/i)).toBeInTheDocument();
    // expect(screen.getByRole("textbox")).toBeInTheDocument();
    // expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    // expect(screen.getByPlaceholderText("search text...")).toBeInTheDocument();
    // expect(screen.getByAltText("search image")).toBeInTheDocument();
    // expect(screen.getByDisplayValue("")).toBeInTheDocument;
  });
});
