import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { act } from "react-dom/test-utils";

describe("App", () => {
  test("renders App component", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);

    expect(screen.queryByText(/Searches for React/)).toBeNull();
    // screen.debug();
    // fireEvent.change(screen.getByRole("textbox"), {
    //   target: { value: "React" },
    // });
    await act(async () => {
      await userEvent.type(screen.getByRole("textbox"), "React");
    });
    expect(screen.getByText(/Searches for React/)).toBeInTheDocument();
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
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it("double click", async () => {
    const onChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={onChange}></input>
    );
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    // fireEvent.click(checkbox);
    // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true });
    await userEvent.dblClick(checkbox);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("input focus", () => {
    render(<input type="text" data-testid="simple-input" />);
    const input = screen.getByTestId("simple-input");
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  it("focus", async () => {
    render(
      <div>
        <input type="checkbox" data-testid="element" />
        <input type="radio" data-testid="element" />
        <input type="number" data-testid="element" />
      </div>
    );
    const [checkbox, radio, number] = screen.getAllByTestId("element");
    await userEvent.tab();
    expect(checkbox).toHaveFocus();
    await userEvent.tab();
    expect(radio).toHaveFocus();
    await userEvent.tab();
    expect(number).toHaveFocus();
  });

  it("select option", async () => {
    render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );
    await userEvent.selectOptions(screen.getByRole("combobox"), "1");
    expect(screen.getByText("A").selected).toBeTruthy();
    await userEvent.selectOptions(screen.getByRole("combobox"), "2");
    expect(screen.getByText("B").selected).toBeTruthy();
    expect(screen.queryByText("A").selected).toBeFalsy();
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
