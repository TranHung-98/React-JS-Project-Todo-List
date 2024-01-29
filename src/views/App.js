import '../style/App.scss';
import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./todos";
import { Home } from "./home";
import About from "./adout";
import ListUser from '../components/user/list-user';


class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div className="App ">
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home />}> </Route>
              <Route path="/about" element={<About />}> </Route>
              <Route path="/todo" element={<Todo />}> </Route>
              <Route path="/user" exact element={<ListUser />}> </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
