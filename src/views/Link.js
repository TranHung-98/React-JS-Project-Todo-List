import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Home } from "./home";

export class NavLink extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/about"></Route>
            <Route path="/todo" element={<App />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}
