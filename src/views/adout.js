import React from "react";
import logo from "./logo.svg";

class About extends React.Component {
  render() {
    return (
      <header className="App-header height--home">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>WELCOME TO ABOUT</h1>
      </header>
    )
  }
}


export default About;
