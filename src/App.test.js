import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);
    screen.getByRole("textbox");
    await screen.findByText(/Logged in as/i);
    expect(screen.queryByText(/Searches for React/)).toBeNull();
    // screen.debug();
    // fireEvent.change(screen.getByRole("textbox"), {
    //   target: { value: "React" },
    // });
    userEvent.type(screen.getByRole("textbox"), "React");
    expect(screen.getByText(/Searches for React/)).toBeInTheDocument();
    // screen.debug();
  });
});

describe("events", () => {
  it("checkbox click", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChange}></input>
    );
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    // fireEvent.click(checkbox);
    // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true });
    userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it("double click", () => {
    const onChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={onChange}></input>
    );
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    // fireEvent.click(checkbox);
    // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true });
    userEvent.dblClick(checkbox);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("input focus", () => {
    const { getByTestId } = render(
      <input type="text" data-testid="simple-input" />
    );
    const input = getByTestId("simple-input");
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  it("focus", () => {
    const { getAllByTestId } = render(
      <div>
        <input type="checkbox" data-testid="element" />
        <input type="radio" data-testid="element" />
        <input type="number" data-testid="element" />
      </div>
    );
    const [checkbox, radio, number] = getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });

  it("select option", () => {
    const { selectOptions, getByText } = render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );
    userEvent.selectOptions(screen.getByRole("combobox"), "1");
    expect(screen.getByText("A").selected).toBeTruthy();
    userEvent.selectOptions(screen.getByRole("combobox"), "2");
    expect(screen.getByText("B").selected).toBeTruthy();
    expect(screen.getByText("A").selected).toBeFalsy();
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
