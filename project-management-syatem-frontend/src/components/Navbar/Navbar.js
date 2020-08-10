import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Header">
      <div class="context">
        <h1>Project Management System</h1>
      </div>

      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <header className="header">
        <nav className="header-links">
          <ul>
            <a href="#">About</a>

            <a href="#">Contact Us</a>
          </ul>
        </nav>
        <div className="social">Social Media Links</div>
      </header>
    </div>
  );
};

export default Navbar;
