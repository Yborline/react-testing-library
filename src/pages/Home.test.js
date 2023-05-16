import React from "react";
import axios from "axios";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";

jest.mock("axios");
const hits = [
  { objectID: "1", title: "Angular" },
  { objectID: "2", title: "React" },
  { objectID: "3", title: "Vue" },
];

describe("Home", () => {
  test("fetches news from an Api", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));
    render(<Home />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(3);
    ///
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "http://hn.algolia.com/api/v1/search?query=React"
    );
  });
  test("fetches news from an API and reject", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    render(<Home />);
    userEvent.click(screen.getByRole("button"));
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });
  test("new fetches news from an Api", async () => {
    const promise = Promise.resolve({ data: { hits } });
    axios.get.mockImplementationOnce(() => promise);
    render(<Home />);
    userEvent.click(screen.getByRole("button"));
    await act(() => promise);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});

// describe("App", () => {
//   it("fetches news from an API", async () => {
//     axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));
//     const { getByRole, findAllByRole } = render(<Home />);
//     userEvent.click(getByRole("button"));
//     const items = await findAllByRole("listitem");
//     expect(items).toHaveLength(2);
//     // Additional
//     expect(axios.get).toHaveBeenCalledTimes(1);
//     expect(axios.get).toHaveBeenCalledWith(
//       "http://hn.algolia.com/api/v1/search?query=React"
//     );
//   });

//   it("fetches news from an API and reject", async () => {
//     axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
//     const { getByRole, findByText } = render(<Home />);
//     userEvent.click(getByRole("button"));
//     const message = await findByText(/Something went wrong/);
//     expect(message).toBeInTheDocument();
//   });

//   it("fetches news from an API (alternative)", async () => {
//     const promise = Promise.resolve({ data: { hits } });
//     axios.get.mockImplementationOnce(() => promise);
//     const { getByRole, getAllByRole } = render(<Home />);
//     userEvent.click(getByRole("button"));
//     await act(() => promise);
//     expect(getAllByRole("listitem")).toHaveLength(2);
//   });
// });
