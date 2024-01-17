import '../style/App.scss';
import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Todo from "./todos";
import { Home } from "./home";
import About from "./adout";
import ListUser from '../components/user/list-user';
import DetailUser from '../components/user/detailUser';


class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div className="App ">
            <Navbar />
            <Switch>
              <Route path="/" exact >
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/todo">
                <Todo />
              </Route>
              <Route path="/user" exact>
                <ListUser />
              </Route>
              <Route path="/user/:id" >
                <DetailUser />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
