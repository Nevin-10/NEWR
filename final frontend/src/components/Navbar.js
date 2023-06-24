import React, { Component } from 'react';
import "./Navstyle.css";
import { Navitem } from "./Navitem";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    return (
      <nav className="NavbarItems" style={{ background: "#D4C4FB" }}>
        <h1 className="navbar-logo" ><Link to="/Dashboard" style={{textDecoration:"none",color:"#472d86"}}>ExpenseX</Link></h1>

        <div className="menu-icons" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {Navitem.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  <i className={item.icon}></i>
                  {item.title}
                </a>
              </li> 
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
