import React from "react";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h4>Project-A</h4>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
