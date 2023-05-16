import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";
import { act } from "react-dom/test-utils";

describe("Portal", () => {
  it("modal shows the children and a close button", async () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose}>
        <div>My portal</div>
      </Modal>
    );
    expect(screen.getByText("My portal")).toBeInTheDocument();
    await userEvent.click(screen.getByText(/close/i));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should be unmounted", () => {
    const { unmount } = render(
      <Modal>
        <div>My portal</div>
      </Modal>
    );
    expect(screen.getByText("My portal")).toBeInTheDocument();
    unmount();
    expect(screen.queryByText("My portal")).not.toBeInTheDocument();
  });
});
