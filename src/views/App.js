import "./App.scss";
import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./todos";
import { Home } from "./home";
import About from "./adout";



/**
 * 2 component:
 *  1. class cmponent
 *  2. function component (
 *  + function App() {}
 *  + cont App = () => {}
 *  ,arrow)
 * Compponent là 1 function và class
 */

class App extends Component {
  render() {

    return (
      <>
        <BrowserRouter>
          <div className="App ">
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/todo" element={<Todo />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
