import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Portal", () => {
  it("modal shows the children and a close button", () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose}>
        <div>My portal</div>
      </Modal>
    );
    expect(screen.getByText("My portal")).toBeInTheDocument();
    userEvent.click(screen.getByText(/close/i));
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
