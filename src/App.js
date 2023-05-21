import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

const About = () => <h1 data-testid={"About-h1"}>You are on the about page</h1>;
const Home = () => <h1 data-testid={"Home-h1"}>Home page</h1>;
const Contact = () => <h1 data-testid={"Contact-h1"}>Contact</h1>;
const NoMatch = () => <h1 data-testid={"NoMatch-h1"}>No match</h1>;

export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

const Name = "John-Kynni";

export const App = () => (
  <div>
    <nav data-testid="navbar">
      <Link data-testid="home-link" to="/">
        Home
      </Link>

      <Link data-testid="about-link" to="/about">
        About
      </Link>
      <Link to={`/contact/${Name}`} data-testid="contact-link">
        Contact
      </Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact/:name" element={<Contact />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>

    <LocationDisplay />
  </div>
);
