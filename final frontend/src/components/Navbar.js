import React, { useState } from 'react';
import "./Navstyle.css";
import { Navitem } from "./Navitem";
import { Link } from "react-router-dom";

const Navbar = ({ value }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const email = value;
  console.log(email)

  return (
    <nav className="NavbarItems" style={{ background: "#D4C4FB" }}>
      <h1 className="navbar-logo" >
        <Link to="/Dashboard" style={{ textDecoration: "none", color: "#472d86" }}>ExpenseX</Link>
      </h1>

      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {Navitem.map((item, index) => (
          <li key={index}>
            <a className={item.cName} href={`/profile?email=${email}`} value={email}>
              <i className={item.icon}></i>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
