import React, { useState, useContext, createContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, toggleLoginStatus] = useState(false);

  const toggleLogin = () => {
    toggleLoginStatus(!isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ toggleLogin, isLoggedIn }}>
      <div>{children}</div>
    </AuthContext.Provider>
  );
};

const ConsumerComponent = () => {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);

  return (
    <>
      <button data-testid="user-button" type="button" onClick={toggleLogin} />
      <h2>Message: {isLoggedIn ? "Welcome!" : "Please, log in"}</h2>
    </>
  );
};

describe("Context", () => {
  it("ConsumerComponent shows default value", () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    expect(screen.getByText(/^Message:/)).toHaveTextContent(
      "Message: Please, log in"
    );
  });

  it("ConsumerComponent toggle value", async () => {
    render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    expect(screen.getByText(/^Message:/)).toHaveTextContent(
      "Message: Please, log in"
    );
    fireEvent.click(screen.getByTestId("user-button"));
    expect(screen.getByText(/^Message:/)).toHaveTextContent(
      "Message: Welcome!"
    );
    fireEvent.click(screen.getByTestId("user-button"));
    expect(screen.getByText(/^Message:/)).toHaveTextContent(
      "Message: Please, log in"
    );
  });
});
