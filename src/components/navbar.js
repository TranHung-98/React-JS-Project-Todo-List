import React from "react";
import "../style/navbar.scss";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {

  render() {
    return (
      <div className="topnav">
        <NavLink className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        } to="/">  Home </NavLink>
        <NavLink className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        } to="/about">Users</NavLink>
        <NavLink className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        } to="/todo">Todos </NavLink>
        <NavLink className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        } to="/user"> Views Users </NavLink>
      </div>
    )
  }
}

export default Navbar;
