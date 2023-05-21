import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { App, LocationDisplay } from "./App";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

describe("React Router", () => {
  it("should render the home page", () => {
    const { container } = renderWithRouter(<App />);
    const navbar = screen.getByTestId("navbar");
    const link = screen.getByTestId("home-link");
    expect(container.innerHTML).toMatch("Home page");
    expect(navbar).toContainElement(link);
  });
  it("should navigate to page", () => {
    const { container } = renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId("contact-link"));

    expect(container.innerHTML).toMatch("John-Kynni");
  });
  it("should navigate to error page if route is wrong", () => {
    const badRoute = "/some-route";
    const { container } = renderWithRouter(<App />, {
      route: badRoute,
    });
    expect(container.innerHTML).toMatch("No match");
  });
  it("rendering a component that use withRouter", () => {
    const badRoute = "/some-route";
    renderWithRouter(<App />, {
      route: badRoute,
    });
    expect(screen.getByTestId("location-display")).toHaveTextContent(badRoute);
  });
});

// describe("App", () => {
//   it("renders App component", async () => {
//     render(<App />);

//     expect(screen.queryByText(/Logged in as/i)).toBeNull();
//     screen.debug();
//     expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();
//     screen.debug();

//     expect(screen.getByLabelText(/search/i)).toBeRequired();
//     expect(screen.getByLabelText(/search/i)).toBeEmptyDOMElement();
//     expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");
//     // expect(screen.queryByText(/Searches for React/i)).toBeNull();
//     // expect(screen.getByText(/Search:/i)).toBeInTheDocument();
//     // expect(screen.getByRole("textbox")).toBeInTheDocument();
//     // expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
//     // expect(screen.getByPlaceholderText("search text...")).toBeInTheDocument();
//     // expect(screen.getByAltText("search image")).toBeInTheDocument();
//     // expect(screen.getByDisplayValue("")).toBeInTheDocument;
//   });
// });
