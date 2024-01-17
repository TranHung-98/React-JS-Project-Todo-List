import React from "react";
import logo from "./logo.svg";

export class Home extends React.Component {

  render() {
    return (
      <header className="App-header height--home">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>WELCOME TO TODO LIST</h1>
      </header>
    )
  }
}
