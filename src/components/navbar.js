import React from "react";
import "../style/navbar.scss";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {

  render() {
    return (
      <div className="topnav">
        <NavLink activeClassName="active" to="/">  Home </NavLink>
        <NavLink activeClassName="active" to="/about">  About  </NavLink>
        <NavLink activeClassName="active" to="/todo">Todos </NavLink>
        <NavLink activeClassName="active" to="/user"> Users  </NavLink>
      </div>
    )
  }
}

export default Navbar;
