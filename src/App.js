import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Modal from "./Components/Portal/Modal";
import { Contact, RouterComponent } from "./ReactRouter.test";

const getUser = () => Promise.resolve({ id: 1, name: "Yauhen" });

const Search = ({ value, onChange, children }) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input
      placeholder="search text..."
      id="search"
      type="text"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const App = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  const changeShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button onClick={changeShowModal}>Open</button>
      {showModal && (
        <Modal onClose={changeShowModal}>
          <h2>pppp</h2>
        </Modal>
      )}
      <Home />
      {user && <h2>Logged in as{user.name}</h2>}
      <img src="" alt="search image" />
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
};

export default App;
